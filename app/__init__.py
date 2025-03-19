from flask import Flask

def create_app():
  app = Flask(__name__)
  app.config.from_object('config.Config')

  # Register routes and views
  from app.routes.main_routes import main
  app.register_blueprint(main)

  return app
