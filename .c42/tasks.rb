require 'date'

SHELL = '/bin/bash'.freeze
NPM = ENV['NPM'] || 'docker-compose run --rm %container% npm'
YARN = ENV['YARN'] || 'docker-compose run --rm %container% yarn'
NODE = ENV['NODE'] || 'docker-compose run --rm %container% node'

desc 'docker:run', 'Lance docker-compose up'
task 'docker:run' do
  check_ssh_agent
  `docker-compose up -d`
end

desc 'docker:restart', 'Lance docker-compose restart'
task 'docker:restart' do
  check_ssh_agent
  `docker-compose restart`
end

# Front
%w(front server frentreprise).each do |ctr|
    package :"#{ctr}" do
        ctr_npm = NPM.gsub("%container%", ctr)
        ctr_yarn = YARN.gsub("%container%", ctr)

        desc 'yarn', 'Lance yarn'
        shell_task 'yarn', ctr_yarn

        desc 'yarn:build', 'Lance yarn build'
        shell_task 'yarn:build', "#{ctr_yarn} build"

        desc 'npm', 'Lance npm'
        shell_task 'npm', ctr_npm

        desc 'node', 'Lance node'
        shell_task 'node', NODE.gsub("%container%", ctr)

        desc 'npm:install', 'Lance npm install'
        shell_task 'npm:install', "#{ctr_npm} install"

        desc 'npm:update', 'Lance npm update'
        shell_task 'npm:update', "#{ctr_npm} update"

        desc 'npm:build', 'Lance npm run build'
        shell_task 'npm:build', "#{ctr_npm} run build"
    end
end

desc 'build', "Build a release"
task 'build' do
    invoke 'frentreprise:yarn:build', []
    invoke 'server:yarn' ['upgrade', 'frentreprise']
    invoke 'server:yarn', ['build']
    invoke 'front:yarn', ['build']
end

desc 'docker:install', 'Installe le docker-compose.yml'
task 'docker:install' do
  if File.exist?('.c42/docker-compose.yml') && File.exist?('docker-compose.yml')
    info('docker-compose.yml is already present')
  else
    info('copying docker-compose.yml')
    copy_file('docker-compose.yml.dist', '.c42/docker-compose.yml')
    create_link('docker-compose.yml', '.c42/docker-compose.yml')
    unless ENV['SKIP_QUESTIONS']
      if yes?('Do you want to edit docker-compose.yml? [y/N]')
        system(%("${EDITOR:-vim}" docker-compose.yml ))
      end
    end
  end
end

# Install
desc 'install', 'Installe le projet'
task :install do
  invoke 'docker:install', []

  info('Yarn install')
  invoke 'front:yarn', ['install']
  invoke 'server:yarn', ['install']

  info('Starting docker')
  invoke 'docker:run', []

  info('Restart front')
  invoke 'docker:restart', ['front']

  info('Restart server')
  invoke 'docker:restart', ['server']
end

depenvs = %w[production preprod]
desc 'deploy DEPLOY_ENV', "deploy to DEPLOY_ENV (#{depenvs.join(', ')})"
task :deploy do |dep_env = '(aucun)'|
  unless depenvs.include?(dep_env)
    error("environnement inconnu: #{dep_env}")
    error('')
    error('DEPLOY_ENV:')
    depenvs.each do |e|
      error("\t- #{e}")
    end
    error('')
    fatal('Impossible de continuer')
  end

  # exec remplace le process actuel
  exec({
         'NPM' => NPM.gsub("%container%", ctr),
         'SKIP_QUESTIONS' => '1'
       }, %(bundle exec cap #{dep_env} deploy))
end

private
def check_ssh_agent
  begin
    socket = (ENV['SSH_AUTH_SOCK']).to_s.strip
    return unless socket.empty? || !File.exist?(socket)
  rescue Errno::ESRCH
  end
  fatal(%{SSH Agent needed, please run the following command :
eval $(ssh-agent -s) && ssh-add})
end
