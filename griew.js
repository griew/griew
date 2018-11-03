"use strict"
var Griew = function () {

    var Localization = function () {
        var _langs = {};
        var _locale = 'fa';

        var setLang = function (name, trans) {
            _langs[name] = trans;
        };

        var setLocale = function (locale) {
            _locale = locale || _locale;
        };

        var getLocale = function () {
            return _locale;
        };

        var isLocale = function (locale) {
            return _locale === locale;
        };

        var hasTransKey = function (key, locale) {
            var subKeys = key.split('.');
            if (_langs[locale] == undefined) return false;
            var result = _langs[locale];
            for (var i = 0; i < subKeys.length; i++) {
                if (subKeys[i] in result) {
                    result = result[subKeys[i]];
                    continue;
                }

                return false;
            }

            return result;
        };

        var getTrans = function (key, locale) {
            var result = hasTransKey(key, locale);
            return result ? result : key;
        };

        var trans = function (key, locale) {
            locale = locale || _locale;
            key = key || '';
            return getTrans(key, locale);
        };

        this.setLang = setLang;
        this.setLocale = setLocale;
        this.getLocale = getLocale;
        this.isLocale = isLocale;
        this.trans = trans;

        //--------------------------------------------------------------------------------------------------------------------------
        setLang('en', {
            filter: {
                string: {
                    operators: {
                        IsEqualTo: "Is Equal To",
                        IsNotEqualTo: "Is Not Equal To",
                        StartWith: "Start With",
                        DoesNotContains: "Does Not Contains",
                        EndsWith: "Ends With",
                        Contains: "Contains"
                    },
                    operand: "Expression",
                    accept: "Accept",
                    clear: "Clear"
                },
                number: {
                    operators: {
                        IsEqualTo: "Is Equal To",
                        IsNotEqualTo: "Is Not Equal To",
                        Between: "Between",
                        IsGreaterThanOrEqualTo: "Is Greater Than Or Equal To",
                        IsGreaterThan: "Is Greater Than",
                        IsLessThanOrEqualTo: "Is Less Than Or Equal To",
                        IsLessThan: "Is Less Than",
                    },
                    operand: "Number",
                    operand1: "From",
                    operand2: "To",
                    accept: "Accept",
                    clear: "Clear"
                },
                datetime: {
                    operators: {
                        IsEqualTo: "Is Equal To",
                        IsNotEqualTo: "Is Not Equal To",
                        Between: "Between",
                        IsAfterThanOrEqualTo: "Is After Than Or Equal To",
                        IsAfterThan: "Is After Than",
                        IsBeforeThanOrEqualTo: "Is Before Than Or Equal To",
                        IsBeforeThan: "Is Before Than",
                    },
                    operand: {
                        year: "Year",
                        month: "Month",
                        day: "Day",
                        hour: "Hour",
                        minute: "Minute",
                    },
                    accept: "Accept",
                    clear: "Clear"
                },
                enum: {
                    accept: "Accept",
                    clear: "Clear"
                }
            },
            order: {
                ascending: 'Ascending',
                descending: 'Descending',
                'clear sort': 'Clear Sort'
            }
        });

        setLang('fa', {
            filter: {
                string: {
                    operators: {
                        IsEqualTo: "برابر باشد با",
                        IsNotEqualTo: "برابر نباشد با",
                        StartWith: "شروع شود با",
                        DoesNotContains: "شامل نشود",
                        EndsWith: "خاتمه یابد با",
                        Contains: "شامل شود"
                    },
                    operand: "عبارت",
                    accept: "اعمال فیلتر",
                    clear: "حذف فیلتر"
                },
                number: {
                    operators: {
                        IsEqualTo: "مساوی باشد با",
                        IsNotEqualTo: "مساوی نباشد با",
                        Between: "بین",
                        IsGreaterThanOrEqualTo: "بزرگ‌تر یا مساوی ",
                        IsGreaterThan: "بزرگ‌تر از",
                        IsLessThanOrEqualTo: "کوچک‌تر یا مساوی",
                        IsLessThan: "کوچک‌تر از",
                    },
                    operand: "عدد",
                    operand1: "از",
                    operand2: "تا",
                    accept: "اعمال فیلتر",
                    clear: "حذف فیلتر"
                },
                datetime: {
                    operators: {
                        IsEqualTo: "برابر باشد با",
                        IsNotEqualTo: "برابر نباشد با",
                        Between: "بین",
                        IsAfterThanOrEqualTo: "پس از یا برابر باشد با",
                        IsAfterThan: "پس از",
                        IsBeforeThanOrEqualTo: "قبل از یا برابر باشد با",
                        IsBeforeThan: "قبل از",
                    },
                    operand: {
                        year: "سال",
                        month: "ماه",
                        day: "روز",
                        hour: "ساعت",
                        minute: "دقیقه",
                    },
                    accept: "اعمال فیلتر",
                    clear: "حذف فیلتر"
                },
                enum: {
                    accept: "اعمال فیلتر",
                    clear: "حذف فیلتر"
                }
            },
            order: {
                ascending: 'ترتیب صعودی',
                descending: 'ترتیب نزولی',
                'clear sort': 'حذف ترتیب'
            }
        });
    };

    var Request = function () {
        var _columns = [];
        var _pagination = {};
        var _filters = [];
        var _orders = [];
        var _extra = {};

        var addColumn = function (column) {
            var index = indexOfColumns(column.name);
            if (index >= 0) {
                _columns[index] = column;

            } else {
                _columns.push(column);
            }
        };
        var getColumn = function (name) {
            var index = indexOfColumns(name);
            if (index >= 0) {
                return _columns[index]
            }
            return null;
        };
        var removeColumn = function (name) {
            var index = indexOfColumns(name);
            if (index >= 0) {
                _columns.splice(index, 1);
            }
        };
        var indexOfColumns = function (name) {
            for (var index in _columns) {
                if (_columns[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var getColumns = function () {
            return _columns;
        };

        var setPagination = function (pagination) {
            _pagination = pagination;
        };
        var getPagination = function () {
            return _pagination;
        };

        var addFilter = function (filter) {
            var index = indexOfFilters(filter.name);
            if (index >= 0) {
                _filters[index] = filter;
            } else {
                _filters.push(filter);
            }
        };
        var getFilter = function (name) {
            var index = indexOfFilters(name);
            if (index >= 0) {
                return _filters[index];
            }

            return null;
        };
        var removeFilter = function (name) {
            var index = indexOfFilters(name);
            if (index >= 0) {
                _filters.splice(index, 1);
            }
        };
        var indexOfFilters = function (name) {
            for (var index in _filters) {
                if (_filters[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var getFilters = function () {
            return _filters;
        };

        var addOrder = function (order) {
            var index = indexOfOrders(order.name);
            if (index >= 0) {
                _orders[index] = order;
            } else {
                _orders.push(order);
            }
        };
        var getOrder = function (name) {
            var index = indexOfOrders(name);
            if (index >= 0) {
                return _orders[index];
            }

            return null;
        };
        var removeOrder = function (name) {
            var index = indexOfOrders(name);
            if (index >= 0) {
                _orders.splice(index, 1);
            }
        };
        var indexOfOrders = function (name) {
            for (var index in _orders) {
                if (_orders[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var getOrders = function () {
            return _orders;
        };

        var setExtra = function (extra) {
            _extra = extra;
        };
        var getExtra = function () {
            return _extra;
        };

        var toArray = function () {
            return [
                getColumns(),
                getFilters(),
                getOrders(),
                getPagination(),
                _extra
            ];
        };
        var toObject = function () {
            return {
                columns: getColumns(),
                filters: getFilters(),
                orders: getOrders(),
                pagination: getPagination(),
                extra: _extra
            };
        };
        var toJson = function () {
            return JSON.stringify(toObject());
        };

        /**
        *
        *
        * @return object
        */
        var collect = function () {
            // collecting columns
            var columns = _View.columns().toArray();
            for (var i = 0; i < columns.length; i++) {
                addColumn(columns[i]);
            }
            // collecting pagination
            setPagination(_Pagination.getPage());
            // collecting filters
            var filters = _Filter.toArray();
            for (var i = 0; i < filters.length; i++) {
                addFilter(filters[i]);
            }
            // collecting orders
            var orders = _Order.toArray();
            for (var i = 0; i < orders.length; i++) {
                addOrder(orders[i]);
            }
            // collecting extra data
            if(_Options.exists('extra')) {
                setExtra(_Options.get('extra'));
            }

            return {
                toArray: toArray,
                toObject: toObject,
                toJson: toJson
            };
        };

        this.collect = collect;
    };

    var Response = function () {
        var _data = [];
        var _columns = [];
        var _pagination = {};
        var _filters = [];
        var _orders = [];
        var _extra = {};

        var setData = function (data) {
            _data = data;
        };
        var getData = function () {
            return _data;
        };

        var addColumn = function (column) {
            var index = indexOfColumns(column.name);
            if (index >= 0) {
                _columns[index] = column;

            } else {
                _columns.push(column);
            }
        };
        var getColumn = function (name) {
            var index = indexOfColumns(name);
            if (index >= 0) {
                return _columns[index]
            }
            return null;
        };
        var indexOfColumns = function (name) {
            for (var index in _columns) {
                if (_columns[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var addColumns = function (columns) {
            if (!Array.isArray(columns)) {
                return;
            }

            for (var i = 0; i < columns.length; i++) {
                addColumn(columns[i]);
            }
        };
        var getColumns = function () {
            return _columns;
        };

        var setPagination = function (pagination) {
            _pagination = pagination;
        };
        var getPagination = function () {
            return _pagination;
        };

        var addFilter = function (filter) {
            var index = indexOfFilters(filter.name);
            if (index >= 0) {
                _filters[index] = filter;
            } else {
                _filters.push(filter);
            }
        };
        var getFilter = function (name) {
            var index = indexOfFilters(name);
            if (index >= 0) {
                return _filters[index];
            }

            return null;
        };
        var indexOfFilters = function (name) {
            for (var index in _filters) {
                if (_filters[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var addFilters = function (filters) {
            if (!Array.isArray(filters)) {
                return;
            }

            for (var i = 0; i < filters.length; i++) {
                addFilter(filters[i]);
            }
        };
        var getFilters = function () {
            return _filters;
        };

        var addOrder = function (order) {
            var index = indexOfOrders(order.name);
            if (index >= 0) {
                _orders[index] = order;
            } else {
                _orders.push(order);
            }
        };
        var getOrder = function (name) {
            var index = indexOfOrders(name);
            if (index >= 0) {
                return _orders[index];
            }

            return null;
        };
        var indexOfOrders = function (name) {
            for (var index in _orders) {
                if (_orders[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var addOrders = function (orders) {
            if (!Array.isArray(orders)) {
                return;
            }

            for (var i = 0; i < orders.length; i++) {
                addOrder(orders[i]);
            }
        };
        var getOrders = function () {
            return _orders;
        };

        var setExtra = function (extra) {
            _extra = extra;
        };
        var getExtra = function () {
            return _extra;
        };

        this.setData = setData;
        this.getData = getData;

        this.addColumn = addColumn;
        this.getColumn = getColumn;
        this.addColumns = addColumns;
        this.getColumns = getColumns;

        this.setPagination = setPagination;
        this.getPagination = getPagination;

        this.addFilter = addFilter;
        this.getFilter = getFilter;
        this.addFilters = addFilters;
        this.getFilters = getFilters;

        this.addOrder = addOrder;
        this.getOrder = getOrder;
        this.addOrders = addOrders;
        this.getOrders = getOrders;

        this.setExtra = setExtra;
        this.getExtra = getExtra;
    };

    var DataProvider = function () {
        var _dataProviders = {};
        var _default = '';

        var setDefault = function (name) {
            _default = name;
        };

        var getDefault = function () {
            return _default;
        };

        var exists = function (name) {
            return _dataProviders[name] !== undefined;
        };

        var setDataProvider = function (name, dataProvider) {
            _dataProviders[name] = dataProvider;
        };

        var getDataProvider = function (name) {
            if (!exists(name)) {
                return null;
            }

            return new _dataProviders[name](_Options);
        };

        var getDefaultDataProvider = function () {
            return getDataProvider(_default);
        };

        var run = function (request, name, callback) {
            var dataProvider = getDefaultDataProvider();

            if(typeof name === 'function') {
                callback = name;
            } else if (name) {
                dataProvider = getDataProvider(name);
            }

            return dataProvider === null ? dataProvider : dataProvider.run(request, new Response(), callback);
        };

        this.set = setDataProvider;
        this.get = getDataProvider;
        this.setDefault = setDefault;
        this.getDefault = getDefault;
        this.run = run;

        //--------------------------------------------------------------------------------------------------------------------------
        setDataProvider('json', function (options) {
            var source;
            var data;
            var autoGenerateColumns;

            var constructor = function () {
                autoGenerateColumns = false;

                if (options.exists('autoGenerateColumns')) {
                    autoGenerateColumns = options.get('autoGenerateColumns');
                }

                if (options.exists('dataSource')) {
                    source = options.get('dataSource');
                }

                if (typeof source === 'string') {
                    data = JSON.parse(source);
                }

                if (!Array.isArray(data)) {
                    throw "Data most be array";
                }
            };

            var processFilters = function (data, filters) {
                return data;
            };

            var processOrders = function (data, orders) {
                return data;
            };

            var processPagination = function (data, pagination) {
                pagination.total = data.length;
                pagination.perPage = pagination.perPage || 15;
                pagination.currentPage = pagination.currentPage || 1;
                pagination.from = ((pagination.currentPage - 1) * pagination.perPage) + 1;
                pagination.count = data.length - pagination.from >= pagination.perPage ? pagination.perPage : data.length - pagination.from + 1;
                pagination.lastPage = Math.ceil(pagination.total / pagination.perPage);

                return data.slice(pagination.from - 1, pagination.from + pagination.count - 1);
            };

            var processColumns = function (data, columns) {
                return columns;
            };

            var run = function (request, response) {
                var tempData;
                var requestObject = request.toObject();

                console.log(request.toArray());
                console.log(requestObject);

                tempData = processFilters(data, requestObject.filters);
                tempData = processOrders(tempData, requestObject.orders);
                tempData = processPagination(tempData, requestObject.pagination);

                response.setData(tempData);
                response.addFilters(requestObject.filters);
                response.addOrders(requestObject.orders);
                response.setPagination(requestObject.pagination);
                response.setExtra(requestObject.extra);
                if (autoGenerateColumns) {
                    response.addColumns(processColumns(tempData, requestObject.columns));
                } else {
                    response.addColumns(requestObject.columns);
                }

                return response;
            };

            this.run = run;

            constructor();
        });

        setDataProvider('ajax', function (options) {
            var source;
            var data;
            var autoGenerateColumns;
            var token;

            var constructor = function () {
                autoGenerateColumns = false;

                if (options.exists('autoGenerateColumns')) {
                    autoGenerateColumns = options.get('autoGenerateColumns');
                }

                if (options.exists('dataSource')) {
                    source = options.get('dataSource');
                }

                if (options.exists('token')) {
                    token = options.get('token');
                }
            };

            var processColumns = function (data, columns) {
                return columns;
            };

            var run = function (request, response, callback) {
                var requestJson = request.toJson();

                $.post(source, {griew: requestJson, _token: token}, function (result) {
                    result = JSON.parse(result);
                    
                    response.setData(result.data);
                    response.addFilters(result.filters);
                    response.addOrders(result.orders);
                    response.setPagination(result.pagination);
                    response.setExtra(result.extra);
                    if (autoGenerateColumns) {
                        response.addColumns(processColumns(data, result.columns));
                    } else {
                        response.addColumns(result.columns);
                    }

                    callback(response);
                });
            };

            this.run = run;

            constructor();
        });
    };

    var View = function () {

        var Row = function () {
            var _className = 'griew-data-row';
            var _container = 'tbody';
            var _template = '<tr>{columns}</tr>';
            var _beforeRender = function (item, template) { return template; };
            var _afterRender = function (html) { return html; };

            var render = function (columns, data, rowNumber, renderColumn) {
                // TODO: validate data and columns
                var renderedColumns = '';
                var renderedRow = '';
                var index = 0;
                var name = '';

                _template = _beforeRender(data, _template, rowNumber);

                for (; index < columns.length; index++) {
                    name = columns[index];
                    renderedColumns += renderColumn(name, data, rowNumber, index + 1);
                }

                renderedRow = parse('columns', renderedColumns, _template);
                renderedRow = $(renderedRow).addClass(_className)[0].outerHTML;

                renderedRow = _afterRender(renderedRow);

                return renderedRow;
            };

            Object.defineProperty(this, 'beforeRender', {
                set: function (callback) {
                    if (typeof callback === 'function') {
                        _beforeRender = callback;
                    }
                }
            });

            Object.defineProperty(this, 'afterRender', {
                set: function (callback) {
                    if (typeof callback === 'function') {
                        _afterRender = callback;
                    }
                }
            });

            Object.defineProperty(this, 'container', {
                set: function (value) {
                    _container = value;
                },
                get: function () {
                    return _container;
                },
            });

            Object.defineProperty(this, 'template', {
                set: function (value) {
                    _template = value;
                },
                get: function () {
                    return _template;
                },
            });

            this.render = function (columns, data, rowNumber, renderColumn) {
                return render(columns, data, rowNumber, renderColumn);
            };
        };

        var Columns = function () {
            var _onshow = function (name) { };
            var _onhide = function (name) { };

            var _className = 'griew-data-column';
            var _columns = {};

            var columnClassName = function (name, dot) {
                return (dot ? '.' : '') + 'griew-column-' + name;
            };

            var add = function (name, caption, schema, type, order, visibility, sortable, filterable, template, options, beforeRender, afterRender) {
                _columns[name] = {
                    name: name,
                    caption: caption,
                    schema: schema,
                    type: type,
                    order: order || 1,
                    visibility: visibility === undefined ? true : visibility,
                    template: template || '<td>{' + name + '}</td>',
                    sortable: sortable,
                    filterable: filterable,
                    options: options,
                    beforeRender: beforeRender || function (name, data, template, rowNumber, colNumber) { return template; },
                    afterRender: afterRender || function (name, html, rowNumber, colNumber) { return html; }
                };
            };

            var get = function (name) {
                return _columns[name];
            };

            var remove = function (name) {
                delete _columns[name];
            };

            var show = function (name) {
                $(_row.getContainer() + ' ' + columnClassName(name, true)).removeClass('griew-column-hide');
                _onshow(name);
            }

            var hide = function (name) {
                $(_row.getContainer() + ' ' + columnClassName(name, true)).addClass('griew-column-hide');
                _onhide(name);
            }

            var visibles = function (unorder) {
                var order = !unorder;
                var columns = [];
                var keys = [];

                for (var key in _columns) {
                    if (_columns[key].visibility) {
                        columns.push(_columns[key]);
                    }
                }

                if (order) {
                    columns.sort(function (a, b) {
                        return a.order - b.order;
                    });
                }

                for (var key in columns) {
                    if (columns[key].visibility) {
                        keys.push(columns[key].name);
                    }
                }
                return keys;
            };

            var toArray = function () {
                var columns = [];
                for (var i in _columns) {
                    columns.push(_columns[i]);
                }
                return columns;
            };

            var render = function (name, rowData, rowNumber, colNumber) {
                // TODO: validate name and value
                var renderedColumn = '';
                var column = _columns[name];
                var data = {};
                data.value = rowData[name];

                var template = column.beforeRender(name, data, column.template, rowNumber, colNumber);

                rowData[name] = data.value;
                renderedColumn = parse(rowData, template);
                renderedColumn = $(renderedColumn).addClass(_className).addClass(columnClassName(name))[0].outerHTML;
                renderedColumn = column.afterRender(name, renderedColumn, rowNumber, colNumber);

                return renderedColumn;
            };

            Object.defineProperty(this, 'onshow', {
                set: function (callback) {
                    if (typeof callback === 'function') {
                        _onshow = callback;
                    }
                }
            });

            Object.defineProperty(this, 'onhide', {
                set: function (callback) {
                    if (typeof callback === 'function') {
                        _onhide = callback;
                    }
                }
            });

            this.add = function (column) {
                if (typeof column !== 'object') {
                    return false;
                }
                if (column.name == undefined || column.name == '') {
                    return false;
                }

                column.caption = column.caption || column.name;
                column.schema = column.schema || null;
                column.type = column.type || 'string';
                column.order = column.order || 1;
                column.visibility = column.visibility === undefined ? true : column.visibility;
                column.template = column.template || '<td>{' + column.name + '}</td>';
                column.sortable = column.sortable === undefined ? true : column.sortable;
                column.filterable = column.filterable === undefined ? true : column.filterable;
                column.options = column.options || null;
                column.beforeRender = column.beforeRender || function (name, data, template, rowNumber, colNumber) { return template; };
                column.afterRender = column.afterRender || function (name, html, rowNumber, colNumber) { return html; } ;

                add(column.name,column.caption,column.schema,column.type,column.order,column.visibility,column.sortable,column.filterable,column.template,column.options,column.beforeRender,column.afterRender);
            };

            this.get = function (name) {
                return get(name);
            };

            this.remove = function (name) {
                remove(name);
            };

            this.show = function (name) {
                show(name);
            };

            this.hide = function (name) {
                hide(name);
            };

            this.visibles = function () {
                return visibles();
            };

            this.toArray = function () {
                return toArray();
            };

            this.render = function (name, rowData, rowNumber, colNumber) {
                return render(name, rowData, rowNumber, colNumber);
            };
        };

        var Header = function () {
            var _rowClassName = 'griew-header-row';
            var _cellClassName = 'griew-header-cell';
            var _container = 'thead';
            var _rowTemplate = '<tr>{cells}</tr>';
            var _cellTemplate = '<th>{cell-name}</th>';

            var columnClassName = function (name, dot) {
                return (dot ? '.' : '') + 'griew-column-' + name;
            };

            var getCellSelector = function (name) {
                return '.' + _cellClassName + columnClassName(name, true);
            }

            var render = function (columns) {
                // TODO: validate data and columns
                var renderedCells = '';
                var renderedCell = '';
                var renderedRow = '';
                var index = 0;
                var name = '';

                for (; index < columns.length; index++) {
                    name = columns[index];
                    renderedCell = parse('cell-name', _columns.get(name).caption, _cellTemplate);
                    renderedCell = $(renderedCell).addClass(_cellClassName).addClass(columnClassName(name))[0].outerHTML;
                    renderedCells += renderedCell;
                }

                renderedRow = parse('cells', renderedCells, _rowTemplate);
                renderedRow = $(renderedRow).addClass(_rowClassName)[0].outerHTML;

                return renderedRow;
            };

            Object.defineProperty(this, 'container', {
                set: function (value) {
                    _container = value;
                },
                get: function () {
                    return _container;
                },
            });

            Object.defineProperty(this, 'rowTemplate', {
                set: function (value) {
                    _rowTemplate = value;
                },
                get: function () {
                    return _rowTemplate;
                },
            });

            Object.defineProperty(this, 'cellTemplate', {
                set: function (value) {
                    _cellTemplate = value;
                },
                get: function () {
                    return _cellTemplate;
                },
            });

            this.render = function (columns) {
                return render(columns);
            };

            this.getCellSelector = function (name) {
                return getCellSelector(name);
            };
        };

        var Filter = function () {
            var _onshow = function (name, container) { };
            var _onhide = function (name, container) { };

            var _boxClassName = 'griew-filter-box';

            var filterClassName = function (name, dot) {
                return (dot ? '.' : '') + 'griew-filter-' + name;
            }

            var add = function (name, container, content) {
                var filterBox = $('<div>')
                    .addClass(_boxClassName)
                    .addClass(filterClassName(name))
                    .append(typeof content === 'function' ? content() : content);
                $(container).append(filterBox);
            };

            var remove = function (name, container) {
                if (container === undefined) {
                    $(filterClassName(name, true)).remove();
                    return;
                }

                $(container + '>' + filterClassName(name, true)).remove();
            };

            var show = function (name, container) {
                if (container === undefined) {
                    $(filterClassName(name, true)).addClass('active');
                } else {
                    $(container + '>' + filterClassName(name, true)).addClass('active');
                }
                _onshow(name, container);
                stateChanged(name, container, 'filter', 'show');
            }

            var hide = function (name, container) {
                if (container === undefined) {
                    $(filterClassName(name, true)).removeClass('active');
                } else {
                    $(container + '>' + filterClassName(name, true)).removeClass('active');
                }
                _onhide(name, container);
                stateChanged(name, container, 'filter', 'hide');
            }

            var toggle = function (name, container) {
                if (container === undefined) {
                    $(filterClassName(name, true)).toggleClass('active');
                } else {
                    $(container + '>' + filterClassName(name, true)).toggleClass('active');
                }

                if (isVisible(name, container)) {
                    _onshow(name, container);
                } else {
                    _onhide(name, container);
                }
            }

            var isVisible = function (name, container) {
                if (container === undefined) {
                    return $(filterClassName(name, true)).hasClass('active');
                }

                return $(container + '>' + filterClassName(name, true)).hasClass('active');
            };

            Object.defineProperty(this, 'onshow', {
                set: function (callback) {
                    _onshow = callback;
                }
            });

            Object.defineProperty(this, 'onhide', {
                set: function (callback) {
                    _onhide = callback;
                }
            });

            this.add = function (name, container, content) {
                add(name, container, content);
            };

            this.remove = function (name, container) {
                remove(name, container);
            };

            this.show = function (name, container) {
                show(name, container);
            };

            this.hide = function (name, container) {
                hide(name, container);
            };

            this.toggle = function (name, container) {
                toggle(name, container);
            };

            this.isVisible = function (name, container) {
                return isVisible(name, container);
            };

            this.addString = function (name, container, visible) {
                var $filterBox = $('<div>').addClass('griew-filter-string-box');
                var $operator = $('<select>').addClass('griew-filter-string-operator');
                var $operand = $('<input type="text">').addClass('griew-filter-string-operand');
                var $btnAccept = $('<button type="button">').addClass('griew-filter-string-btn-accept');
                var $btnClear = $('<button type="button">').addClass('griew-filter-string-btn-clear');

                var operators = [
                    'Contains',
                    'DoesNotContains',
                    'IsEqualTo',
                    'IsNotEqualTo',
                    'StartWith',
                    'EndsWith'
                ];

                for (var i in operators) {
                    $operator.append($('<option>').text(trans('filter.string.operators.' + operators[i])).val(operators[i]));
                }
                $operand.attr('placeholder', trans('filter.string.operand'));
                $btnAccept.text(trans('filter.string.accept')).click(function () {
                    _Filter.add(name, 'string', $operator.val(), $operand.val());
                    refresh();
                    hide(name, container);
                });
                $btnClear.text(trans('filter.string.clear')).click(function () {
                    _Filter.remove(name);
                    refresh();
                    hide(name, container);
                });

                $filterBox.append($operator).append($operand).append($btnAccept).append($btnClear);

                add(name, container, $filterBox);

                if (visible) {
                    show(name, container);
                }

                _Filter.onCreate = function (filter) {
                    if (filter.name == name) {
                        $operand.val(filter.operand1);
                        $operator.val(filter.operator).change();
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onUpdate = function (filter) {
                    if (filter.name == name) {
                        $operand.val(filter.operand1);
                        $operator.val(filter.operator).change();
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onRemove = function (filter) {
                    if (filter.name == name) {
                        $operand.val('');
                        $operator.val('Contains').change();
                        $(container).children('.griew-filter-button').removeClass('active');
                    }
                };
            };

            this.addNumber = function (name, container, visible) {
                var $filterBox = $('<div>').addClass('griew-filter-number-box');
                var $operator = $('<select id="operator">').addClass('griew-filter-number-operator');
                var $operand1 = $('<input type="number" id="operand1">').addClass('griew-filter-number-operand');
                var $operand2 = $('<input type="number" id="operand2">').addClass('griew-filter-number-operand');
                var $btnAccept = $('<button type="button">').addClass('griew-filter-number-btn-accept');
                var $btnClear = $('<button type="button">').addClass('griew-filter-number-btn-clear');

                var operators = [
                    'IsEqualTo',
                    'IsNotEqualTo',
                    'Between',
                    'IsGreaterThanOrEqualTo',
                    'IsGreaterThan',
                    'IsLessThanOrEqualTo',
                    'IsLessThan'
                ];

                for (var i in operators) {
                    $operator.append($('<option>').text(trans('filter.number.operators.' + operators[i])).val(operators[i]));
                }

                $operator.change(function () {
                    if ($(this).val() === 'Between') {
                        $operand2.removeClass('hide');
                        $operand1.attr('placeholder', trans('filter.number.operand1'));
                    } else {
                        $operand2.addClass('hide');
                        $operand1.attr('placeholder', trans('filter.number.operand'));
                    }
                });

                $operand1.attr('placeholder', trans('filter.number.operand1'));
                $operand2.attr('placeholder', trans('filter.number.operand2'));
                $btnAccept.text(trans('filter.number.accept')).click(function () {
                    if ($operator.val() === 'Between') {
                        _Filter.add(name, 'number', $operator.val(), Number($operand1.val()), Number($operand2.val()));
                    } else {
                        _Filter.add(name, 'number', $operator.val(), Number($operand1.val()));
                    }
                    refresh();
                    hide(name, container);
                });
                $btnClear.text(trans('filter.number.clear')).click(function () {
                    _Filter.remove(name);
                    refresh();
                    hide(name, container);
                });

                $filterBox.append($operator).append($operand1).append($operand2).append($btnAccept).append($btnClear);

                add(name, container, $filterBox);

                $operator.change();

                if (visible) {
                    show(name, container);
                }

                _Filter.onCreate = function (filter) {
                    if (filter.name == name) {
                        $operand1.val(filter.operand1);
                        $operand2.val(filter.operand2);
                        $operator.val(filter.operator).change();
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onUpdate = function (filter) {
                    if (filter.name == name) {
                        $operand1.val(filter.operand1);
                        $operand2.val(filter.operand2);
                        $operator.val(filter.operator).change();
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onRemove = function (filter) {
                    if (filter.name == name) {
                        $operand1.val('');
                        $operand2.val('');
                        $operator.val('IsEqualTo').change();
                        $(container).children('.griew-filter-button').removeClass('active');
                    }
                };
            };

            this.addDateTime = function (name, container, options, visible) {
                options = options || {};

                var $filterBox = $('<div>').addClass('griew-filter-datetime-box');
                var $operator = $('<select id="operator">').addClass('griew-filter-datetime-operator');

                var $operand1 = $('<div id="operand1">').addClass('griew-filter-datetime-operand');
                var $operand1Year = $('<input type="number">').addClass('griew-filter-datetime-operand-year');
                var $operand1Month = $('<input type="number">').addClass('griew-filter-datetime-operand-month');
                var $operand1Day = $('<input type="number">').addClass('griew-filter-datetime-operand-day');
                var $operand1Hour = $('<input type="number">').addClass('griew-filter-datetime-operand-hour');
                var $operand1Minute = $('<input type="number">').addClass('griew-filter-datetime-operand-minute');
                var $operand1DateWrapper = $('<div>').addClass('griew-filter-datetime-date-wrapper');
                var $operand1TimeWrapper = $('<div>').addClass('griew-filter-datetime-time-wrapper');

                var $operand2 = $('<div id="operand2">').addClass('griew-filter-datetime-operand');
                var $operand2Year = $('<input type="number">').addClass('griew-filter-datetime-operand-year');
                var $operand2Month = $('<input type="number">').addClass('griew-filter-datetime-operand-month');
                var $operand2Day = $('<input type="number">').addClass('griew-filter-datetime-operand-day');
                var $operand2Hour = $('<input type="number">').addClass('griew-filter-datetime-operand-hour');
                var $operand2Minute = $('<input type="number">').addClass('griew-filter-datetime-operand-minute');
                var $operand2DateWrapper = $('<div>').addClass('griew-filter-datetime-date-wrapper');
                var $operand2TimeWrapper = $('<div>').addClass('griew-filter-datetime-time-wrapper');

                var dateSeparator = '<span class="griew-filter-datetime-date-separator"></span>';
                var timeSeparator = '<span class="griew-filter-datetime-time-separator"></span>';
                var $btnAccept = $('<button type="button">').addClass('griew-filter-datetime-btn-accept');
                var $btnClear = $('<button type="button">').addClass('griew-filter-datetime-btn-clear');

                var operators = [
                    'IsEqualTo',
                    'IsNotEqualTo',
                    'Between',
                    'IsAfterThanOrEqualTo',
                    'IsAfterThan',
                    'IsBeforeThanOrEqualTo',
                    'IsBeforeThan'
                ];

                for (var i in operators) {
                    $operator.append($('<option>').text(trans('filter.datetime.operators.' + operators[i])).val(operators[i]));
                }
                $operator.change(function () {
                    if ($(this).val() === 'Between') {
                        $operand2.removeClass('hide');
                    } else {
                        $operand2.addClass('hide');
                    }
                });

                $operand1Year
                    .attr({
                        'placeholder': trans('filter.datetime.operand.year'),
                        'min': options.year && options.year ? options.year.min : 1000,
                        'max': options.year && options.year ? options.year.max : ''
                    })
                    .val(options.default && options.default.year ? options.default.year : '');
                $operand1Month
                    .attr({
                        'placeholder': trans('filter.datetime.operand.month'),
                        'min': 1,
                        'max': 12
                    })
                    .val(options.default && options.default.month ? options.default.month : '');
                $operand1Day
                    .attr({
                        'placeholder': trans('filter.datetime.operand.day'),
                        'min': 1,
                        'max': 31
                    })
                    .val(options.default && options.default.day ? options.default.day : '');
                $operand1Hour
                    .attr({
                        'placeholder': trans('filter.datetime.operand.hour'),
                        'min': 0,
                        'max': 23
                    })
                    .val(options.default && options.default.hour ? options.default.hour : '');
                $operand1Minute
                    .attr({
                        'placeholder': trans('filter.datetime.operand.minute'),
                        'min': 0,
                        'max': 59
                    })
                    .val(options.default && options.default.minute ? options.default.minute : '');

                $operand2Year
                    .attr({
                        'placeholder': trans('filter.datetime.operand.year'),
                        'min': options.year && options.year.min ? options.year.min : 1000,
                        'max': options.year && options.year.max ? options.year.max : ''
                    })
                    .val(options.default && options.default.year ? options.default.year : '');
                $operand2Month
                    .attr({
                        'placeholder': trans('filter.datetime.operand.month'),
                        'min': 1,
                        'max': 12
                    })
                    .val(options.default && options.default.month ? options.default.month : '');
                $operand2Day
                    .attr({
                        'placeholder': trans('filter.datetime.operand.day'),
                        'min': 1,
                        'max': 31
                    })
                    .val(options.default && options.default.day ? options.default.day : '');
                $operand2Hour
                    .attr({
                        'placeholder': trans('filter.datetime.operand.hour'),
                        'min': 0,
                        'max': 23
                    })
                    .val(options.default && options.default.hour ? options.default.hour : '');
                $operand2Minute
                    .attr({
                        'placeholder': trans('filter.datetime.operand.minute'),
                        'min': 0,
                        'max': 59
                    })
                    .val(options.default && options.default.minute ? options.default.minute : '');

                $btnAccept.text(trans('filter.datetime.accept')).click(function () {
                    var operand1 = {
                        year: Number($operand1Year.val()),
                        month: Number($operand1Month.val()),
                        day: Number($operand1Day.val()),
                        hour: Number($operand1Hour.val()),
                        minute: Number($operand1Minute.val())
                    };

                    var operand2 = {
                        year: Number($operand2Year.val()),
                        month: Number($operand2Month.val()),
                        day: Number($operand2Day.val()),
                        hour: Number($operand2Hour.val()),
                        minute: Number($operand2Minute.val())
                    };

                    if ($operator.val() === 'Between') {
                        _Filter.add(name, 'datetime', $operator.val(), operand1, operand2);
                    } else {
                        _Filter.add(name, 'datetime', $operator.val(), operand1);
                    }

                    refresh();
                    hide(name, container);
                });
                $btnClear.text(trans('filter.datetime.clear')).click(function () {
                    _Filter.remove(name);
                    refresh();
                    hide(name, container);
                });

                options.type = options.type || 'datetime';
                if (options.type && options.type === 'date' || options.type === 'datetime') {
                    $operand1DateWrapper
                        .append($operand1Year)
                        .append(dateSeparator)
                        .append($operand1Month)
                        .append(dateSeparator)
                        .append($operand1Day);
                    $operand1.append($operand1DateWrapper);

                    $operand2DateWrapper
                        .append($operand2Year)
                        .append(dateSeparator)
                        .append($operand2Month)
                        .append(dateSeparator)
                        .append($operand2Day);
                    $operand2.append($operand2DateWrapper);
                }

                if (options.type && options.type === 'time' || options.type === 'datetime') {
                    $operand1TimeWrapper
                        .append($operand1Hour)
                        .append(timeSeparator)
                        .append($operand1Minute);
                    $operand1.append($operand1TimeWrapper);

                    $operand2TimeWrapper
                        .append($operand2Hour)
                        .append(timeSeparator)
                        .append($operand2Minute);
                    $operand2.append($operand2TimeWrapper);
                }

                $filterBox.append($operator).append($operand1).append($operand2).append($btnAccept).append($btnClear);

                add(name, container, $filterBox);

                $operator.change();

                if (visible) {
                    show(name, container);
                }

                _Filter.onCreate = function (filter) {
                    if (filter.name == name) {
                        if (filter.operand1) {
                            $operand1Year.val(filter.operand1.year);
                            $operand1Month.val(filter.operand1.month);
                            $operand1Day.val(filter.operand1.day);
                            $operand1Hour.val(filter.operand1.hour);
                            $operand1Minute.val(filter.operand1.minute);
                        }

                        if (filter.operand2) {
                            $operand2Year.val(filter.operand2.year);
                            $operand2Month.val(filter.operand2.month);
                            $operand2Day.val(filter.operand2.day);
                            $operand2Hour.val(filter.operand2.hour);
                            $operand2Minute.val(filter.operand2.minute);
                        }
                        $operator.val(filter.operator).change();
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onUpdate = function (filter) {
                    if (filter.name == name) {
                        if (filter.operand1) {
                            $operand1Year.val(filter.operand1.year);
                            $operand1Month.val(filter.operand1.month);
                            $operand1Day.val(filter.operand1.day);
                            $operand1Hour.val(filter.operand1.hour);
                            $operand1Minute.val(filter.operand1.minute);
                        }

                        if (filter.operand2) {
                            $operand2Year.val(filter.operand2.year);
                            $operand2Month.val(filter.operand2.month);
                            $operand2Day.val(filter.operand2.day);
                            $operand2Hour.val(filter.operand2.hour);
                            $operand2Minute.val(filter.operand2.minute);
                        }
                        $operator.val(filter.operator).change();
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onRemove = function (filter) {
                    if (filter.name == name) {
                        $operand1Year.val('');
                        $operand1Month.val('');
                        $operand1Day.val('');
                        $operand1Hour.val('');
                        $operand1Minute.val('');
                        $operand2Year.val('');
                        $operand2Month.val('');
                        $operand2Day.val('');
                        $operand2Hour.val('');
                        $operand2Minute.val('');
                        $operator.val('IsEqualTo').change();
                        $(container).children('.griew-filter-button').removeClass('active');
                    }
                };
            };

            this.addEnum = function (name, container, options, visible) {
                options = options || {};

                var $filterBox = $('<div>').addClass('griew-filter-enum-box');
                var $operand = $('<div>').addClass('griew-filter-enum-operand');
                var $btnAccept = $('<button type="button">').addClass('griew-filter-enum-btn-accept');
                var $btnClear = $('<button type="button">').addClass('griew-filter-enum-btn-clear');

                var operator = 'In';

                options.items = options.items || {};
                var type = options.type && options.type == 'single' ? 'radio' : 'checkbox';
                for (var i in options.items) {
                    $operand.append(
                        $('<label>').addClass('griew-filter-enum-item-control')
                            .append(
                            $('<input>').addClass('griew-filter-enum-item-input').val(i).attr({ 'name': 'filter_' + name, 'type': type })
                            )
                            .append(
                            $('<span>').addClass('griew-filter-enum-item-caption').html(options.items[i])
                            )
                    );
                }

                $btnAccept.text(trans('filter.enum.accept')).click(function () {
                    var operand = [];
                    $operand.find('.griew-filter-enum-item-input:checked').each(function (number, input) {
                        operand.push(input.value);
                    });
                    _Filter.add(name, 'enum', operator, operand);
                    refresh();
                    hide(name, container);
                });
                $btnClear.text(trans('filter.enum.clear')).click(function () {
                    _Filter.remove(name);
                    refresh();
                    hide(name, container);
                });

                $filterBox.append($operand).append($btnAccept).append($btnClear);

                add(name, container, $filterBox);

                if (visible) {
                    show(name, container);
                }

                _Filter.onCreate = function (filter) {
                    if (filter.name == name) {
                        $operand.find('.griew-filter-enum-item-input').removeAttr('checked').prop('checked', false);
                        for (var i = 0; i < filter.operand1.length; i++) {
                            $operand.find('.griew-filter-enum-item-input[value=' + filter.operand1[i] + ']').attr('checked', 'checked').prop('checked', true);
                        }
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onUpdate = function (filter) {
                    if (filter.name == name) {
                        $operand.find('.griew-filter-enum-item-input').removeAttr('checked').prop('checked', false);
                        for (var i = 0; i < filter.operand1.length; i++) {
                            $operand.find('.griew-filter-enum-item-input[value=' + filter.operand1[i] + ']').attr('checked', 'checked').prop('checked', true);
                        }
                        $(container).children('.griew-filter-button').addClass('active');
                    }
                };

                _Filter.onRemove = function (filter) {
                    if (filter.name == name) {
                        $operand.find('.griew-filter-enum-item-input').removeAttr('checked').prop('checked', false);
                        $(container).children('.griew-filter-button').removeClass('active');
                    }
                };
            };

            this.autoGenerate = function (columns, getContainer) {
                var column = null;
                var container = '';

                for (var i in columns) {
                    column = _columns.get(columns[i]);
                    container = getContainer(column.name);

                    if (!column.filterable) {
                        continue;
                    }

                    var $button = $('<button>');
                    $button.addClass('griew-filter-button');
                    $button.data('FilterBoxName', column.name);
                    $button.data('FilterBoxContainer', container);
                    $button.click(function () {
                        var filterBoxName = $(this).data('FilterBoxName');
                        var filterBoxContainer = $(this).data('FilterBoxContainer');
                        if (isVisible(filterBoxName, filterBoxContainer)) {
                            hide(filterBoxName, filterBoxContainer);
                        } else {
                            show(filterBoxName, filterBoxContainer);
                        }
                    });

                    $(container).append($button);

                    switch (column.type) {
                        case 'string':
                            _filters.addString(column.name, container, false);
                            break;
                        case 'number':
                            _filters.addNumber(column.name, container, false);
                            break;
                        case 'datetime':
                            var options = column.options && column.options.filter ? column.options.filter : undefined;
                            _filters.addDateTime(column.name, container, options, false);
                            break;
                        case 'enum':
                            var options = column.options && column.options.filter ? column.options.filter : undefined;
                            _filters.addEnum(column.name, container, options, false);
                            break;
                        case 'boolean':
                            var options = column.options && column.options.filter ? column.options.filter : undefined;
                            _filters.addBoolean(column.name, container, options, false);
                            break;
                    }

                    onStateChanged(column.name, container, 'filter', function (name, container, section, state) {
                        if (state == 'show' && (section == 'order' || section == 'filter')) {
                            hide(name, container);
                        }
                    });
                }
            };
        };

        var Order = function () {
            var _onshow = function (name, container) { };
            var _onhide = function (name, container) { };

            var _boxClassName = 'griew-order-box';

            var orderClassName = function (name, dot) {
                return (dot ? '.' : '') + 'griew-order-' + name;
            };

            var add = function (name, container, content) {
                var orderBox = $('<div>').addClass(_boxClassName).addClass(orderClassName(name)).append(typeof content === 'function' ? content() : content);
                $(container).append(orderBox);
            };

            var remove = function (name, container) {
                if (container === undefined) {
                    $(orderClassName(name, true)).remove();
                    return;
                }

                $(container + '>' + orderClassName(name, true)).remove();
            };

            var show = function (name, container) {
                if (container === undefined) {
                    $(orderClassName(name, true)).addClass('active');
                } else {
                    $(container + '>' + orderClassName(name, true)).addClass('active');
                }
                _onshow(name, container);
                stateChanged(name, container, 'order', 'show');
            }

            var hide = function (name, container) {
                if (container === undefined) {
                    $(orderClassName(name, true)).removeClass('active');
                } else {
                    $(container + '>' + orderClassName(name, true)).removeClass('active');
                }
                _onhide(name, container);
                stateChanged(name, container, 'order', 'hide');
            }

            var toggle = function (name, container) {
                if (container === undefined) {
                    $(orderClassName(name, true)).toggleClass('active');
                } else {
                    $(container + '>' + orderClassName(name, true)).toggleClass('active');
                }

                if (isVisible(name, container)) {
                    _onshow(name, container);
                } else {
                    _onhide(name, container);
                }
            }

            var isVisible = function (name, container) {
                if (container === undefined) {
                    return $(orderClassName(name, true)).hasClass('active');
                }

                return $(container + '>' + orderClassName(name, true)).hasClass('active');
            };

            Object.defineProperty(this, 'onshow', {
                set: function (callback) {
                    _onshow = callback;
                }
            });

            Object.defineProperty(this, 'onhide', {
                set: function (callback) {
                    _onhide = callback;
                }
            });

            this.add = function (name, container, content) {
                add(name, container, content);
            };

            this.remove = function (name, container) {
                remove(name, container);
            };

            this.show = function (name, container) {
                show(name, container);
            };

            this.hide = function (name, container) {
                hide(name, container);
            };

            this.toggle = function (name, container) {
                toggle(name, container);
            };

            this.isVisible = function (name, container) {
                return isVisible(name, container);
            };

            this.addDefault = function (name, container, visible) {
                var orderBox = $('<ul>').addClass('griew-order-default-box');
                var $btnAscSort = $('<li>').addClass('griew-order-default-btn-sort').addClass('griew-order-default-asc-sort');
                var $btnDescSort = $('<li>').addClass('griew-order-default-btn-sort').addClass('griew-order-default-desc-sort');
                var $btnClearSort = $('<li>').addClass('griew-order-default-btn-sort').addClass('griew-order-default-clear-sort');

                $btnAscSort.append($('<a>').text(trans('order.ascending')));
                $btnDescSort.append($('<a>').text(trans('order.descending')));
                $btnClearSort.append($('<a>').text(trans('order.clear sort')));

                $btnAscSort.click(function () {
                    _Order.addAscending(name);
                    refresh();
                    hide(name, container);
                });

                $btnDescSort.click(function () {
                    _Order.addDescending(name);
                    refresh();
                    hide(name, container);
                });

                $btnClearSort.click(function () {
                    _Order.remove(name);
                    refresh();
                    hide(name, container);
                });

                orderBox.append($btnAscSort).append($btnDescSort).append($btnClearSort);

                add(name, container, orderBox);

                if (visible) {
                    show(name, container);
                }

                _Order.onCreate = function (order) {

                    if (order.name == name) {
                        if (order.type == 'ASC') {
                            $btnAscSort.addClass('active');
                            $btnDescSort.removeClass('active');
                            $(container).children('.griew-order-button')
                                .removeClass('griew-order-desc')
                                .addClass('griew-order-asc');
                        }
                        else if (order.type == 'DESC') {
                            $btnDescSort.addClass('active');
                            $btnAscSort.removeClass('active');
                            $(container).children('.griew-order-button')
                                .removeClass('griew-order-asc')
                                .addClass('griew-order-desc');
                        }
                    }
                };

                _Order.onUpdate = function (order) {
                    if (order.name == name) {
                        if (order.type == 'ASC') {
                            $btnAscSort.addClass('active');
                            $btnDescSort.removeClass('active');
                            $(container).children('.griew-order-button')
                                .removeClass('griew-order-desc')
                                .addClass('griew-order-asc');
                        }
                        else if (order.type == 'DESC') {
                            $btnDescSort.addClass('active');
                            $btnAscSort.removeClass('active');
                            $(container).children('.griew-order-button')
                                .removeClass('griew-order-asc')
                                .addClass('griew-order-desc');
                        }
                    }
                };

                _Order.onRemove = function (order) {
                    if (order.name == name) {
                        $btnDescSort.removeClass('active');
                        $btnAscSort.removeClass('active');
                        $(container).children('.griew-order-button')
                            .removeClass('griew-order-asc')
                            .removeClass('griew-order-desc');
                    }
                };
            };

            this.autoGenerate = function (columns, getContainer) {
                var column = null;
                var container = '';

                for (var i in columns) {
                    column = _columns.get(columns[i]);
                    container = getContainer(column.name);

                    if (!column.sortable) {
                        continue;
                    }

                    var $button = $('<button>');
                    $button.addClass('griew-order-button');
                    $button.data('OrderBoxName', column.name);
                    $button.data('OrderBoxContainer', container);
                    $button.click(function () {
                        var orderBoxName = $(this).data('OrderBoxName');
                        var orderBoxContainer = $(this).data('OrderBoxContainer');
                        if (isVisible(orderBoxName, orderBoxContainer)) {
                            hide(orderBoxName, orderBoxContainer);
                        } else {
                            show(orderBoxName, orderBoxContainer);
                        }
                    });

                    $(container).append($button);

                    _orders.addDefault(column.name, container, false);

                    onStateChanged(column.name, container, 'order', function (name, container, section, state) {
                        if (state == 'show' && (section == 'order' || section == 'filter')) {
                            hide(name, container);
                        }
                    });
                }
            };
        };

        var Pagination = function () {
            var container;
            var buttonGroupTemplate;
            var numberButtonTemplate;
            var nextButtonTemplate;
            var previousButtonTemplate;
            var firstButtonTemplate;
            var lastButtonTemplate;
            var jumpNextButtonTemplate;
            var jumpPreviousButtonTemplate;
            var manualNavigationTemplate;

            var initTemplateItems = function (options) {
                options = options || {};

                container = options.container || '.pagination';
                buttonGroupTemplate = options.buttonGroupTemplate || '<ul class="griew-pagination">{pagination-items}</ul>';
                numberButtonTemplate = options.numberButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}" data-action="{pagination-action}">{pagination-number}</a></li>';
                nextButtonTemplate = options.nextButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}" data-action="{pagination-action}">{pagination-next}</a></li>';
                previousButtonTemplate = options.previousButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}" data-action="{pagination-action}">{pagination-previous}</a></li>';
                firstButtonTemplate = options.firstButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}" data-action="{pagination-action}">{pagination-first}</a></li>';
                lastButtonTemplate = options.lastButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}" data-action="{pagination-action}">{pagination-last}</a></li>';
                jumpNextButtonTemplate = options.jumpNextButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}" data-action="{pagination-action}">{pagination-jump-next}</a></li>';
                jumpPreviousButtonTemplate = options.jumpPreviousButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}" data-action="{pagination-action}">{pagination-jump-previous}</a></li>';
                manualNavigationTemplate = options.manualNavigationTemplate || '<li class="griew-pagination-item griew-pagination-manual"><input type="number" class="griew-pagination-manual-input" value="{pagination-current}" min="1" max="{pagination-last}"><span class="griew-pagination-manual-separator"></span><span class="griew-pagination-manual-last">{pagination-last}</span></li>'
            };

            var render = function (options) {
                var page = _Pagination.getPage();
                var items = '';
                var index = 0;
                var count = 5;
                var halfCount = Math.floor(count / 2);
                var length = count > page.currentPage + halfCount ? count : page.currentPage + halfCount;
                length = length > page.lastPage ? page.lastPage : length;

                options = options || {};
                var optionOnePageNavigation = options.onePageNavigation == undefined ? true : options.onePageNavigation;
                var optionMultiPagesNavigation = options.multiPagesNavigation == undefined ? true : options.multiPagesNavigation;
                var optionManualNavigation = options.manualNavigation == undefined ? true : options.manualNavigation;
                var optionJumpPagesCount = options.jumpPagesCount ? options.jumpPagesCount : 10;

                items = items.concat(parse({
                    'pagination-page': 1,
                    'pagination-action': 'first',
                    'pagination-first': ''
                }, firstButtonTemplate));

                if (optionMultiPagesNavigation) {
                    items = items.concat(parse({
                        'pagination-page': optionJumpPagesCount,
                        'pagination-action': 'previous',
                        'pagination-jump-previous': ''
                    }, jumpPreviousButtonTemplate));
                }

                if (optionOnePageNavigation) {
                    items = items.concat(parse({
                        'pagination-page': 1,
                        'pagination-action': 'previous',
                        'pagination-previous': ''
                    }, previousButtonTemplate));
                }

                index = page.currentPage - halfCount;
                for (; ;) {
                    if (index <= 0) {
                        index++;
                        continue;
                    }

                    if (index > length) {
                        break;
                    }

                    items = items + parse({
                        'pagination-page': index,
                        'pagination-number': index,
                        'pagination-action': 'page'
                    }, numberButtonTemplate);

                    index++;
                }

                if (optionOnePageNavigation) {
                    items = items.concat(parse({
                        'pagination-page': 1,
                        'pagination-action': 'next',
                        'pagination-next': ''
                    }, nextButtonTemplate));
                }

                if (optionMultiPagesNavigation) {
                    items = items.concat(parse({
                        'pagination-page': optionJumpPagesCount,
                        'pagination-action': 'next',
                        'pagination-jump-next': ''
                    }, jumpNextButtonTemplate));
                }

                items = items.concat(parse({
                    'pagination-page': page.lastPage,
                    'pagination-action': 'last',
                    'pagination-last': ''
                }, lastButtonTemplate));

                if (optionManualNavigation) {
                    items = items.concat(parse({
                        'pagination-current': page.currentPage,
                        'pagination-last': page.lastPage
                    }, manualNavigationTemplate));
                }

                var $group = $(parse('pagination-items', items, buttonGroupTemplate));
                $group.find('.griew-pagination-link[data-action="page"][data-page="' + page.currentPage + '"]').parent().addClass('active');

                return $group;
            };

            var generate = function () {
                var options = _Options.get('pagination');
                initTemplateItems(options);
                $(container).html(render(options));
                $(container).on('click', '.griew-pagination-link', function () {
                    var page = $(this).data('page');
                    switch ($(this).data('action')) {
                        case 'page':
                            _Pagination.gotoPage(page);
                            break;
                        case 'next':
                            _Pagination.gotoPage(_Pagination.getCurrentPage() + page);
                            break;
                        case 'previous':
                            _Pagination.gotoPage(_Pagination.getCurrentPage() - page);
                            break;
                        case 'last':
                            _Pagination.gotoLastPage();
                            break;
                        case 'first':
                            _Pagination.gotoFirstPage();
                            break;
                    }
                    refresh();
                    // $(container).html(render(options));
                });
                $(container).on('change', '.griew-pagination-manual-input', function () {
                    _Pagination.gotoPage($(this).val());
                    $(container).html(render(options));
                    $(container).find('.griew-pagination-manual-input').focus();
                });
            };

            this.render = function () {
                var options = _Options.get('pagination');
                $(container).html(render(options));
            };

            this.generate = function () {
                generate();
            };
        };

        var _row = new Row();
        var _columns = new Columns();
        var _header = new Header();
        var _filters = new Filter();
        var _orders = new Order();
        var _pagination = new Pagination();
        var _boxList = [];
        var _data = [];

        var parse = function (name, value, source) {
            //TODO validation for source
            var key = new RegExp('[{]{1}[ ]*[a-zA-Z0-9._-]+[ ]*[}]{1}', 'gi');
            var keyWithName = new RegExp('[{]{1}[ ]*(' + name + '){1}[ ]*[}]{1}', 'gi');
            if (typeof name === 'string') {
                return source.replace(keyWithName, value);
            }
            source = value;
            value = name;
            var names = source.match(key) || [];
            for (var i = 0; i < names.length; i++) {
                name = names[i].replace(/[{ }]*/gi, '');
                source = parse(name, value[name], source);
            }
            return source;
        };

        var render = function (data) {
            // TODO: validate data for array
            var index = 0;
            var columns = _columns.visibles();
            var $rowContainer = $(_row.container);
            var $headerContainer = $(_header.container);

            $rowContainer.html('');

            $headerContainer.html(_header.render(columns));

            _filters.autoGenerate(columns, function (name) {
                return _header.getCellSelector(name);
            });

            _orders.autoGenerate(columns, function (name) {
                return _header.getCellSelector(name);
            });

            var paginationOptions = _Options.get('pagination') || {};
            if (paginationOptions.visibility == undefined || paginationOptions.visibility == true) {
                _pagination.generate();
            }

            for (; index < data.length; index++) {
                $rowContainer.append(_row.render(columns, data[index], index + 1, _columns.render));
            }
        };

        var stateChanged = function (name, container, section, state) {
            for (var i = 0; i < _boxList.length; i++) {
                if (_boxList[i].name == name && _boxList[i].section == section) {
                    continue;
                }
                if (_boxList[i].callback) {
                    _boxList[i].callback(_boxList[i].name, _boxList[i].container, section, state);
                }
            }
        };

        var onStateChanged = function (name, container, section, callback) {
            _boxList.push({
                name: name,
                container: container,
                section: section,
                callback: callback
            });
        };

        this.filters = function () {
            return _filters
        };

        this.orders = function () {
            return _orders
        };

        this.pagination = function () {
            return _pagination;
        };

        this.row = function () {
            return _row;
        };

        this.columns = function () {
            return _columns;
        };

        this.render = function (data) {
            //clone of data
            if(data) {
                _data = Object.assign([], data);
            }
            render(_data);
        };
    };

    var Filter = function () {
        var _filters = [];
        var _createCallbacks = [];
        var _updateCallbacks = [];
        var _removeCallbacks = [];

        //------------ String & Number & Date & Boolean ------------\\
        var IS_EQUAL_TO = 'IsEqualTo';
        var IS_NOT_EQUAL_TO = 'IsNotEqualTo';
        //------------ String ------------\\
        var START_WITH = 'StartWith';
        var DOES_NOT_CONTAINS = 'DoesNotContains';
        var ENDS_WITH = 'EndsWith';
        var CONTAINS = 'Contains';
        //------------ Enum ------------\\
        var IN = 'In';
        var NOT_IN = 'NotIn';
        //------------ Number & Date ------------\\
        var BETWEEN = 'Between';
        //------------ Number ------------\\
        var IS_GREATER_THAN_OR_EQUAL_TO = 'IsGreaterThanOrEqualTo';
        var IS_GREATER_THAN = 'IsGreaterThan';
        var IS_LESS_THAN_OR_EQUAL_TO = 'IsLessThanOrEqualTo';
        var IS_LESS_THAN = 'IsLessThan';
        //------------ Date ------------\\
        var IS_AFTER_THAN_OR_EQUAL_TO = 'IsAfterThanOrEqualTo';
        var IS_AFTER_THAN = 'IsAfterThan';
        var IS_BEFORE_THAN_OR_EQUAL_TO = 'IsBeforeThanOrEqualTo';
        var IS_BEFORE_THAN = 'IsBeforeThan';

        var add = function (name, type, operator, operand1, operand2) {
            var filter = {
                name: name,
                type: type,
                operator: operator,
                operand1: operand1,
                operand2: operand2
            };

            if (find(name)) {
                filter = find(name);
                filter.name = name;
                filter.type = type;
                filter.operator = operator;
                filter.operand1 = operand1;
                filter.operand2 = operand2;
                fireUpdate(filter);
            }
            else {
                _filters.push(filter);
                fireCreate(filter);
            }
        };

        var remove = function (name) {
            for (var i in _filters) {
                if (_filters[i].name === name) {
                    fireRemove(_filters.splice(i, 1)[0])
                    return true;
                }
            }
            return false;
        };

        var find = function (name) {
            for (var i in _filters) {
                if (_filters[i].name === name) {
                    return _filters[i];
                }
            }
            return null;
        };

        var clear = function () {
            for (var index = 0; index < _filters.length; index++) {
                remove(_filters[index].name);
            }
        };

        var toArray = function () {
            return _filters;
        };

        var fireCreate = function (filter) {
            for (var i = 0; i < _createCallbacks.length; i++) {
                _createCallbacks[i](filter);
            }
        };

        var fireUpdate = function (filter) {
            for (var i = 0; i < _updateCallbacks.length; i++) {
                _updateCallbacks[i](filter);
            }
        };

        var fireRemove = function (filter) {
            for (var i = 0; i < _removeCallbacks.length; i++) {
                _removeCallbacks[i](filter);
            }
        };

        this.add = add;
        this.remove = remove;
        this.clear = clear;
        this.find = find;
        this.toArray = toArray;
        Object.defineProperty(this, 'onCreate', {
            set: function (callback) {
                _createCallbacks.push(callback);
            }
        });
        Object.defineProperty(this, 'onUpdate', {
            set: function (callback) {
                _updateCallbacks.push(callback);
            }
        });
        Object.defineProperty(this, 'onRemove', {
            set: function (callback) {
                _removeCallbacks.push(callback);
            }
        });
    };

    var Order = function () {
        var _orders = [];
        var _createCallbacks = [];
        var _updateCallbacks = [];
        var _removeCallbacks = [];

        var ASC = "ASC";
        var DESC = "DESC";

        var add = function (name, type) {
            var order = {
                name: name,
                type: type.toUpperCase()
            };
            if (find(name)) {
                order = find(name);
                order.name = name;
                order.type = type.toUpperCase();
                fireUpdate(order);
            }
            else {
                _orders.push(order);
                fireCreate(order);
            }
        };

        var remove = function (name) {
            for (var i in _orders) {
                if (_orders[i].name === name) {
                    fireRemove(_orders.splice(i, 1)[0]);
                    return true;
                }
            }
            return false;
        };

        var find = function (name) {
            for (var i in _orders) {
                if (_orders[i].name === name) {
                    return _orders[i];
                }
            }
            return null;
        };

        var swap = function (name) {
            var order = find(name);
            if (order === null) {
                return false;
            }
            if (order.type === ASC) {
                order.type = DESC;
            }
            else {
                order.type = ASC;
            }
            fireUpdate(order);
        };

        var clear = function () {
            for (var index = 0; index < _orders.length; index++) {
                remove(_orders[index].name);
            }
        };

        var fireCreate = function (order) {
            for (var i = 0; i < _createCallbacks.length; i++) {
                _createCallbacks[i](order);
            }
        };

        var fireUpdate = function (order) {
            for (var i = 0; i < _updateCallbacks.length; i++) {
                _updateCallbacks[i](order);
            }
        };

        var fireRemove = function (order) {
            for (var i = 0; i < _removeCallbacks.length; i++) {
                _removeCallbacks[i](order);
            }
        };

        var toArray = function () {
            return _orders;
        };

        this.addAscending = function (name) {
            if (name) {
                add(name, ASC);
                return true;
            }
            return false;
        };
        this.addDescending = function (name) {
            if (name) {
                add(name, DESC);
                return true;
            }
            return false;
        };
        this.remove = remove;
        this.clear = clear;
        this.find = find;
        this.swap = swap;
        this.toArray = toArray;
        Object.defineProperty(this, 'onCreate', {
            set: function (callback) {
                _createCallbacks.push(callback);
            }
        });
        Object.defineProperty(this, 'onUpdate', {
            set: function (callback) {
                _updateCallbacks.push(callback);
            }
        });
        Object.defineProperty(this, 'onRemove', {
            set: function (callback) {
                _removeCallbacks.push(callback);
            }
        });
    };

    var Pagination = function () {
        var _page = {
            currentPage: 1,
            lastPage: 1,
            perPage: 15,
            total: 0,
            from: 1,
            count: 0
        };

        var gotoPage = function (number) {
            if (number && parseInt(number) > 0) {
                number = parseInt(number);
                _page.currentPage = number;
                if (number > _page.lastPage) {
                    _page.currentPage = _page.lastPage;
                }
            }
        };

        var gotoNext = function () {
            if (_page.currentPage < _page.lastPage) {
                _page.currentPage++
            }
        };

        var gotoPrevious = function () {
            if (_page.currentPage > 1) {
                _page.currentPage--
            }
        };

        var gotoFirst = function () {
            _page.currentPage = 1;
        };

        var gotoLast = function () {
            _page.currentPage = _page.lastPage;
        };

        var setPerPage = function (number) {
            if (number && parseInt(number) > 0) {
                _page.perPage = number;
            }
        };

        var getPerPage = function () {
            return _page.perPage;
        };

        var currentPage = function () {
            return _page.currentPage;
        };

        var setPage = function (currentPage, lastPage, perPage, total, from, count) {
            gotoPage(currentPage);
            lastPage = parseInt(lastPage);
            perPage = parseInt(perPage);
            total = parseInt(total);
            from = parseInt(from);
            count = parseInt(count);
            _page.lastPage = (lastPage && lastPage > 0) ? lastPage : _page.lastPage;
            _page.perPage = (perPage && perPage > 0) ? perPage : _page.perPage;
            _page.total = (total && total >= 0) ? total : _page.total;
            _page.from = (from && from > 0) ? from : _page.from;
            _page.count = (count && count >= 0) ? count : _page.count;
        };

        var getPage = function () {
            return _page;
        };

        this.gotoPage = gotoPage;
        this.gotoNextPage = gotoNext;
        this.gotoPreviousPage = gotoPrevious;
        this.gotoFirstPage = gotoFirst;
        this.gotoLastPage = gotoLast;
        this.setPerPage = setPerPage;
        this.getPerPage = getPerPage;
        this.getCurrentPage = currentPage;
        this.setPage = setPage;
        this.getPage = getPage;
    };
     
    var Options = function () {
        var _options = {};

        var set = function (name, value) {
            _options[name] = value;
        };

        var get = function (name) {
            return _options[name];
        };

        var exists = function (name) {
            return _options[name] !== undefined;
        };

        this.set = set;
        this.get = get;
        this.exists = exists;
    };
    //--------------------------------------------------------------------------------------------------------------------------
    var _Localization = new Localization();
    var _DataProvider = new DataProvider();
    var _View = new View();
    var _Filter = new Filter();
    var _Order = new Order();
    var _Pagination = new Pagination();
    var _Options = new Options();
    //--------------------------------------------------------------------------------------------------------------------------
    _DataProvider.setDefault('ajax');
    //--------------------------------------------------------------------------------------------------------------------------
    var trans = function (key, locale) {
        return _Localization.trans(key, locale);
    };

    var render = function () {
        _View.render();
    };

    var refresh = function () {
        _DataProvider.run(new Request().collect(), function(response) {
            _View.render(response.getData());
            
            var filters = response.getFilters();
            for(var i = 0; i < filters.length; i++) {
                _Filter.add(filters[i].name, filters[i].type, filters[i].operator, filters[i].operand1, filters[i].operand2);
            }

            var orders = response.getOrders();
            for(var i = 0; i < orders.length; i++) {
                if(orders[i].type === 'DESC') {
                    _Order.addDescending(orders[i].name);
                } else {
                    _Order.addAscending(orders[i].name);
                }
            }
            
            
        });
    };
    //--------------------------------------------------------------------------------------------------------------------------
    this.view = function () { 
        return _View; 
    };

    this.filter = function () { 
        return _Filter; 
    };

    this.order = function () { 
        return _Order; 
    };

    this.pagination = function () { 
        return _Pagination; 
    };

    this.options = function () { 
        return _Options; 
    };

    this.dataProvider = function () {
        return _DataProvider;
    };

    this.setLang = _Localization.setLang;
    this.setLocale = _Localization.setLocale;
    this.getLocale = _Localization.getLocale;
    this.isLocale = _Localization.isLocale;
    this.trans = _Localization.trans;

    this.refresh = refresh;
    this.render = render;
};
//--------------------------------------------------------------------------------------------------------------------------