#!/usr/bin/env ruby

require "sinatra/base"
require "sinatra/reloader"
require "sinatra/flash"

require_relative "app/helpers/app_helper"
require_relative "app/helpers/overlord_helper"

require_relative "app/models/bomb"
require_relative "app/models/trigger"
require_relative "app/models/timer"

module Project
  class Workshop < Sinatra::Base
    register Sinatra::Reloader
    register Sinatra::Flash

    helpers AppHelper
    helpers OverlordHelper

    configure do
      enable :sessions

      set :server, :puma
      set :name, "Spec Workshop"
      set :views, "app/views"
      set :session_secret, "spatially foliated hypersurface with temporal coordinates"
    end

    get "/" do
      erb :index
    end

    get "/overlord/?" do
      title "Project Overlord"
      erb :overlord
    end

    post "/overlord" do
      session.clear if session[:activate]
      
      # The params came from the name attribute on the form element.
      session[:activate] = params[:activation_code]
      session[:deactivate] = params[:deactivation_code]
      session[:countdown] = params[:countdown_value]

      redirect to("/bomb")
    end

    get "/bomb" do
      @bomb = session[:bomb] || provision_bomb
      session[:bomb] = @bomb
      erb :"overlord/bomb"
    end

    post "/set/:seconds" do
      @bomb = session[:bomb]
      timer.reset(params[:seconds].to_i)
    end

    get '/enter/:code?' do
      @bomb = session[:bomb]

      if trigger.valid?(params[:code])
        trigger_bomb_state(trigger, timer)
      else
        flash[:invalid_code] = "The code must be four numeric characters."
      end

      redirect to("/bomb")
    end

    def trigger
      @bomb.components[:trigger]
    end

    def timer
      @bomb.components[:timer]
    end
  end
end

Project::Workshop.run! port: 9292 if __FILE__ == $PROGRAM_NAME
