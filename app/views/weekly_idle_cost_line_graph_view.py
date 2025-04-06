from flask import render_template

def weekly_idle_cost_line_graph_view():
  return render_template('dashboard/weekly_idle_cost_line_graph.html')
