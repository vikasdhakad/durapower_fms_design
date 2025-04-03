from flask import render_template

def fuel_vs_efficiency_scatter_plot_graph_view():
  return render_template('dashboard/fuel_vs_efficiency_scatter_plot_graph.html')
