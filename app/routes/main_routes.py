from flask import Blueprint, render_template
from app.views.index_view import index_view
from app.views.map_view import map_view
from app.views.vehicles_view import vehicles_view
from app.views.vehicle_show_view import vehicle_show_view
from app.views.map_display_view import map_display_view
from app.views.service_view import service_view
from app.views.vehicle_show_map_view import vehicle_show_map_view
from app.views.analytics_view import analytics_view
from app.views.reminders_view import reminders_view
from app.views.alerts_view import alerts_view
from app.views.ai_driven_analytics_view import ai_driven_analytics_view
from app.views.routing_view import routing_view
from app.views.reports_view import reports_view
from app.views.fuel_and_energy_view import fuel_and_energy_view

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

@main.route('/reminders')
def reminders():
  return reminders_view()

@main.route('/alerts')
def alerts():
  return alerts_view()

@main.route('/ai-driven-analytics')
def ai_driven_analytics():
  return ai_driven_analytics_view()

@main.route('/routing')
def routing():
  return routing_view()

@main.route('/reports')
def reports():
  return reports_view()

@main.route('/fuel-and-energy')
def fuel_and_energy():
  return fuel_and_energy_view()
