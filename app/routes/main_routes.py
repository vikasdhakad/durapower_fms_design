from flask import Blueprint, render_template
from app.views.index_view import index_view
from app.views.map_view import map_view
from app.views.vehicles_view import vehicles_view
from app.views.vehicle_show_view import vehicle_show_view
from app.views.map_display_view import map_display_view
from app.views.service_view import service_view
from app.views.vehicle_show_map_view import vehicle_show_map_view
from app.views.analytics_view import analytics_view

main = Blueprint('main', __name__)

# Define routes
@main.route('/')
def index():
  return index_view()

@main.route('/map')
def map():
  return map_view()

@main.route('/map_display')
def map_display():
  return map_display_view()

@main.route('/vehicles')
def vehicles():
  return vehicles_view()

@main.route('/vehicle_show')
def vehicle_show():
  return vehicle_show_view()

@main.route('/vehicle_show_map_display')
def vehicle_show_map_display():
  return vehicle_show_map_view()

@main.route('/service')
def service():
  return service_view()

@main.route('/analytics')
def analytics():
  return analytics_view()

