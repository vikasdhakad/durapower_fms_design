class RemindersPage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      var dataTable = _this.displayDataInTable();
      _this.searchRecords(_this, dataTable);
      _this.selecter(_this);
      _this.clearSelected(_this, dataTable);
    });
  }

  displayDataInTable() {
    return $('#reminders_data_show_table').DataTable({
      dom: "<'text-muted'Bi>\n        <'table-responsive'tr>\n        <'mt-4'p>",
      buttons: [],
      language: {
        paginate: {
          previous: '<i class="fa fa-lg fa-angle-left"></i>',
          next: '<i class="fa fa-lg fa-angle-right"></i>'
        }
      },
      autoWidth: false,
      ajax: 'static/data/reminders_page.json',
      deferRender: true,
      order: [1, 'asc'],
      columns: [{
        data: 'id',
        className: 'col-checker align-middle',
        orderable: false,
        searchable: false
      }, {
        data: 'vehicle_name',
        className: 'align-middle'
      }, {
         data: 'service_task',
         className: 'align-middle'
      }, {
       data: 'status',
       className: 'align-middle'
      }, {
       data: 'next_due',
       className: 'align-middle'
      }, {
       data: 'active_work_order',
       className: 'align-middle'
      }, {
       data: 'completed',
       className: 'align-middle text-right',
       orderable: false,
       searchable: false
      }, {
       data: 'watchers',
       className: 'align-middle text-right',
       orderable: false,
       searchable: false
      }],
      columnDefs: [{
        targets: 0,
        render: function render(data, type, row, meta) {
          return "<div class=\"custom-control custom-control-nolabel custom-checkbox\">\n            <input type=\"checkbox\" class=\"custom-control-input\" name=\"selectedRow[]\" id=\"p".concat(row.id, "\" value=\"").concat(row.id, "\">\n            <label class=\"custom-control-label\" for=\"p").concat(row.id, "\"></label>\n          </div>");
        }
      }, {
        targets: 1,
        render: function render(data, type, row, meta) {
          return "<a href=\"vehicle_show#id/".concat(row.id, "\" class=\"tile tile-img mr-1\">\n            <img class=\"img-fluid\" src=\"https://anl.sg/31/isuzu-24ft-truck-lorries-open-canopy-box.jpg\" alt=\"Card image cap\">\n          </a>\n          <a href=\"vehicle_show#id/").concat(row.id, "\">").concat(row.vehicle_name, "</a>");
        }
      }]
    });
  }

  searchRecords(_this, dataTable) {
    $('#table-search, #filterBy').on('keyup change focus', function (e) {
      var filterBy = $('#filterBy').val();
      var hasFilter = filterBy !== '';
      var value = $('#table-search').val(); // clear selected rows

      if (value.length && (e.type === 'keyup' || e.type === 'change')) {
        _this.clearSelectedRows(_this, dataTable);
      } // reset search term

      dataTable.search('').columns().search('').draw();

      if (hasFilter) {
        dataTable.columns(filterBy).search(value).draw();
      } else {
        dataTable.search(value).draw();
      }
    });
  }

  selecter(_this) {
    var self = this;
    $(document).on('change', '#check-handle', function () {
      var isChecked = $(this).prop('checked');
      $('input[name="selectedRow[]"]').prop('checked', isChecked); // get info

      _this.getSelectedInfo();
    }).on('change', 'input[name="selectedRow[]"]', function () {
      var $selectors = $('input[name="selectedRow[]"]');
      var $selectedRow = $('input[name="selectedRow[]"]:checked').length;
      var prop = $selectedRow === $selectors.length ? 'checked' : 'indeterminate'; // reset props

      $('#check-handle').prop('indeterminate', false).prop('checked', false);

      if ($selectedRow) {
        $('#check-handle').prop(prop, true);
      } // get info

      _this.getSelectedInfo();
    });
  }

  getSelectedInfo() {
    var $selectedRow = $('input[name="selectedRow[]"]:checked').length;
    var $info = $('.thead-btn');
    var $badge = $('<span/>').addClass('selected-row-info text-muted pl-1').text("".concat($selectedRow, " selected")); // remove existing info

    $('.selected-row-info').remove(); // add current info

    if ($selectedRow) {
      $info.prepend($badge);
    }
  }

  clearSelected(_this, dataTable) {
    $('#reminders_data_show_table').on('page.dt', function () {
      _this.clearSelectedRows();
    });
    $('#clear-search').on('click', function () {
      _this.clearSelectedRows();
    });
  }

  clearSelectedRows() {
    $('#check-handle').prop('indeterminate', false).prop('checked', false).trigger('change');
  }
}

const remindersPage = new RemindersPage();
