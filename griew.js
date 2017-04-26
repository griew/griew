"use strict"
var Griew = function () {

    var Localization = function () {
        var _locale = 'fa';

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
            if (Griew.langs[locale] == undefined) return false;
            var result = Griew.langs[locale];
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

        this.setLocale = setLocale;
        this.getLocale = getLocale;
        this.isLocale = isLocale;
        this.trans = trans;
    };

    var Request = function () {
        var _columns = [];
        var _pagination = {};
        var _filters = [];
        var _orders = [];
        var _extra = {};

        var addColumn = function (column) {
            var index = indexOfColumns(column.name);
            if(index >= 0) {
                _columns[index] = column;

            } else {
                _columns.push(column);
            }
        };
        var getColumn = function (name) {
            var index = indexOfColumns(name);
            if(index >= 0) {
                return _columns[index]
            }
            return null;
        };
        var removeColumn = function (name) {
            var index = indexOfColumns(name);
            if(index >= 0) {
                _columns.splice(index, 1);
            }
        };
        var indexOfColumns = function (name) {
            for(var index in _columns) {
                if(_columns[index].name == name) {
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
            if(index >= 0) {
                _filters[index] = filter;
            } else {
                _filters.push(filter);
            }
        };
        var getFilter = function (name) {
            var index = indexOfFilters(name);
            if(index >= 0) {
                return _filters[index];
            }

            return null;
        };
        var removeFilter = function (name) {
            var index = indexOfFilters(name);
            if(index >= 0) {
                _filters.splice(index, 1);
            }
        };
        var indexOfFilters = function (name) {
            for(var index in _filters) {
                if(_filters[index].name == name) {
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
            if(index >= 0) {
                _orders[index] = order;
            } else {
                _orders.push(order);
            }
        };
        var getOrder = function (name) {
            var index = indexOfOrders(name);
            if(index >= 0) {
                return _orders[index];
            }

            return null;
        };
        var removeOrder = function (name) {
            var index = indexOfOrders(name);
            if(index >= 0) {
                _orders.splice(index, 1);
            }
        };
        var indexOfOrders = function (name) {
            for(var index in _orders) {
                if(_orders[index].name == name) {
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
                columns : getColumns(),
                filters : getFilters(),
                orders : getOrders(),
                pagination : getPagination(),
                extra : _extra
            };
        };
        var toJson = function () {
            return JSON.strigify(toObject());
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
            for(var i = 0; i < filters.length; i++) {
                addFilter(filters[i]);
            }
            // collecting orders
            var orders = _Order.toArray();
            for (var i = 0; i < orders.length; i++) {
                addOrder(orders[i]);
            }
            // collecting extra data 

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
            if(index >= 0) {
                _columns[index] = column;

            } else {
                _columns.push(column);
            }
        };
        var getColumn = function (name) {
            var index = indexOfColumns(name);
            if(index >= 0) {
                return _columns[index]
            }
            return null;
        };
        var indexOfColumns = function (name) {
            for(var index in _columns) {
                if(_columns[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var addColumns = function (columns) {
            if(!Array.isArray(columns)) {
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
            if(index >= 0) {
                _filters[index] = filter;
            } else {
                _filters.push(filter);
            }
        };
        var getFilter = function (name) {
            var index = indexOfFilters(name);
            if(index >= 0) {
                return _filters[index];
            }

            return null;
        };
        var indexOfFilters = function (name) {
            for(var index in _filters) {
                if(_filters[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var addFilters = function (filters) {
            if(!Array.isArray(filters)) {
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
            if(index >= 0) {
                _orders[index] = order;
            } else {
                _orders.push(order);
            }
        };
        var getOrder = function (name) {
            var index = indexOfOrders(name);
            if(index >= 0) {
                return _orders[index];
            }

            return null;
        };
        var indexOfOrders = function (name) {
            for(var index in _orders) {
                if(_orders[index].name == name) {
                    return index;
                }
            }

            return -1;
        };
        var addOrders = function (orders) {
            if(!Array.isArray(orders)) {
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
        var _default = '';

        var setDefault = function (name) {
            _default = name;
        };

        var getDefault = function () {
            return _default;
        };

        var exists = function (name) {
            return Griew.dataProviders[name] !== undefined;
        };

        var getDefaultDataProvider = function () {
            return getDataProvider(_default);
        };

        var getDataProvider = function (name) {
            if(!exists(name)) {
                return null;
            }

            return new Griew.dataProviders[name](_Options);
        };

        var run = function (request, name) {
            var dataProvider = name === undefined ? getDefaultDataProvider() : getDataProvider(name);
            return dataProvider === null ? dataProvider : dataProvider.run(request, new Response());
        };

        this.setDefault = setDefault;
        this.getDefault = getDefault;
        this.run = run;

        //--------------------------------------------------------------------------------------------------------------------------
        Griew.setDataProvider('json', function (options) {
            var source;
            var data;
            var autoGenerateColumns;

            var constructor = function () {
                autoGenerateColumns = false;

                if(options.exists('autoGenerateColumns')) {
                    autoGenerateColumns = options.get('autoGenerateColumns');
                }

                if(options.exists('dataSource')) {
                    source = options.get('dataSource');
                }

                if(typeof source === 'string') {
                    data = JSON.parse(source);
                }

                if(!Array.isArray(data)) {
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
                return data;
            };

            var processColumns = function (data, columns) {
                return columns;
            };

            var run = function (request, response) {
                var tempData;
                var requestObject = request.toObject();

                console.log(requestObject);

                tempData = processFilters(data, requestObject.filters);
                tempData = processOrders(tempData, requestObject.orders);
                tempData = processPagination(tempData, requestObject.pagination);

                response.setData(tempData);
                response.addFilters(requestObject.filters);
                response.addOrders(requestObject.orders);
                response.setPagination(requestObject.pagination);
                response.setExtra(requestObject.extra);
                if(autoGenerateColumns) {
                    response.addColumns(processColumns(tempData, requestObject.columns));
                } else {
                    response.addColumns(requestObject.columns);
                }

                return response;
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
            var _beforRender = function (item, template) { return template; };
            var _afterRender = function (html) { return html; };

            var render = function (columns, data, rowNumber, renderColumn) {
                // TODO: validate data and columns
                var renderedColumns = '';
                var renderedRow = '';
                var index = 0;
                var name = '';

                _template = _beforRender(data, _template, rowNumber);

                for (; index < columns.length; index++) {
                    name = columns[index];
                    renderedColumns += renderColumn(name, data, rowNumber, index + 1);
                }

                renderedRow = parse('columns', renderedColumns, _template);
                renderedRow = $(renderedRow).addClass(_className)[0].outerHTML;

                renderedRow = _afterRender(renderedRow);

                return renderedRow;
            };

            Object.defineProperty(this, 'beforRender', {
                set: function (callback) {
                    if (typeof callback === 'function') {
                        _beforRender = callback;
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

            this.render = render;
        };

        var Columns = function () {
            var _onshow = function (name) { };
            var _onhide = function (name) { };

            var _className = 'griew-data-column';
            var _columns = {};

            var columnClassName = function (name, dot) {
                return (dot ? '.' : '') + 'griew-column-' + name;
            };

            var add = function (name, caption, schema, type, order, visibility, sortable, filterable, template, options, beforRender, afterRender) {
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
                    beforRender: beforRender || function (name, data, template, rowNumber, colNumber) { return template; },
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

                var template = column.beforRender(name, data, column.template, rowNumber, colNumber);

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

            this.add = function (name, caption, schema, type, order, visibility, sortable, filterable, template, options, beforRender, afterRender) {
                //TODO name param maybe string, col object or array of col objects.
                add(name, caption, schema, type, order, visibility, sortable, filterable, template, options, beforRender, afterRender);
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

            this.render = render;
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

            this.render = render;
            this.getCellSelector = getCellSelector;
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
            }

            var hide = function (name, container) {
                if (container === undefined) {
                    $(filterClassName(name, true)).removeClass('active');
                } else {
                    $(container + '>' + filterClassName(name, true)).removeClass('active');
                }
                _onhide(name, container);
            }

            var hideOthers = function (name, container) {
                if (container === undefined) {
                    $('.' + _boxClassName + ':not(' + filterClassName(name, true) + ')').removeClass('active');
                } else {
                    $(container + '>' + '.' + _boxClassName + ':not(' + filterClassName(name, true) + ')').removeClass('active');
                }
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

            /**
             * 
             * Add a custom filter box to container[s]
             * @param {string} name
             * @param {selector} container
             * @param {html|function} content
             * @return {undefined}
             */
             this.add = function (name, container, content) {
                add(name, container, content);
            };

            /**
             * 
             * Remove filter box by name and container. if do not choose container remove all filter boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.remove = function (name, container) {
                remove(name, container);
            };

            /**
             * 
             * Visible filter box by name and container. if do not choose container visible all filter boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.show = function (name, container) {
                show(name, container);
            };

            /**
             * 
             * Invisible filter box by name and container. if do not choose container invisible all filter boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.hide = function (name, container) {
                hide(name, container);
            };

            /**
             * 
             * Invisible Other filter boxs by name and container. if do not choose container invisible all other filter boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.hideOthers = function (name, container) {
                hideOthers(name, container);
            };

            /**
             * 
             * Toggle visible filter box by name and container. if do not choose container toggle visible all filter boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.toggle = function (name, container) {
                toggle(name, container);
            };

            /**
             * 
             * Return state of visibility a filter box by name with container or without container.
             * @param {string} name
             * @param {selector} container
             * @return {boolean}
             */
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
                    _Filter.add(name, 'string',$operator.val(), $operand.val());
                    hide(name, container);
                });
                $btnClear.text(trans('filter.string.clear')).click(function () {
                    _Filter.remove(name);
                    hide(name, container);
                });

                $filterBox.append($operator).append($operand).append($btnAccept).append($btnClear);

                add(name, container, $filterBox);

                if (visible) {
                    show(name, container);
                }
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
                    if($(this).val() === 'Between') {
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
                    if($operator.val() === 'Between') {
                        _Filter.add(name, 'number',$operator.val(), Number($operand1.val()), Number($operand2.val()));
                    } else {
                        _Filter.add(name, 'number',$operator.val(), Number($operand1.val()));
                    }

                    hide(name, container);
                });
                $btnClear.text(trans('filter.number.clear')).click(function () {
                    _Filter.remove(name);
                    hide(name, container);
                });

                $filterBox.append($operator).append($operand1).append($operand2).append($btnAccept).append($btnClear);

                add(name, container, $filterBox);

                $operator.change();

                if (visible) {
                    show(name, container);
                }
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
                    if($(this).val() === 'Between') {
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

                    if($operator.val() === 'Between') {
                        _Filter.add(name, 'datetime',$operator.val(), operand1, operand2);
                    } else {
                        _Filter.add(name, 'datetime',$operator.val(), operand1);
                    }

                    hide(name, container);
                });
                $btnClear.text(trans('filter.datetime.clear')).click(function () {
                    _Filter.remove(name);
                    hide(name, container);
                });

                options.type = options.type || 'datetime';
                if(options.type && options.type === 'date' || options.type === 'datetime') {
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

                if(options.type && options.type === 'time' || options.type === 'datetime') {
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
                for(var i in options.items) {
                    $operand.append(
                        $('<label>').addClass('griew-filter-enum-item-control').append(
                            $('<input>').addClass('griew-filter-enum-item-input').val(i).attr({'name': 'filter_' + name, 'type': type})
                            ).append(
                            $('<span>').addClass('griew-filter-enum-item-caption').html(options.items[i])
                            )
                            );
                }
                
                $btnAccept.text(trans('filter.enum.accept')).click(function () {
                    var operand = [];
                    $operand.find('.griew-filter-enum-item-input:checked').each(function(number, input){
                        operand.push(input.value);
                    });
                    _Filter.add(name, 'enum', operator, operand);
                    hide(name, container);
                });
                $btnClear.text(trans('filter.enum.clear')).click(function () {
                    _Filter.remove(name);
                    hide(name, container);
                });

                $filterBox.append($operand).append($btnAccept).append($btnClear);

                add(name, container, $filterBox);

                if (visible) {
                    show(name, container);
                }
            };

            this.autoGenerate = function (columns, getContainer) {
                var column = null;
                var container = '';

                for(var i in columns) { 
                    column = _columns.get(columns[i]);
                    container = getContainer(column.name);

                    var $button = $('<button>');
                    $button.addClass('griew-filter-button');
                    $button.data('FilterBoxName', column.name);
                    $button.data('FilterBoxContainer', container);
                    $button.click(function () {
                        var filterBoxName = $(this).data('FilterBoxName');
                        var filterBoxContainer = $(this).data('FilterBoxContainer');
                        if(isVisible(filterBoxName, filterBoxContainer)) {
                            hide(filterBoxName, filterBoxContainer);
                        } else {
                            hideOthers(filterBoxName);
                            show(filterBoxName, filterBoxContainer);
                        }
                    });

                    $(container).append($button);

                    switch(column.type) {
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
            }

            var hide = function (name, container) {
                if (container === undefined) {
                    $(orderClassName(name, true)).removeClass('active');
                } else {
                    $(container + '>' + orderClassName(name, true)).removeClass('active');
                }
                _onhide(name, container);
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

            /**
             * 
             * Add a custom order box to container[s]
             * @param {string} name
             * @param {selector} container
             * @param {html|function} content
             * @return {undefined}
             */
             this.add = function (name, container, content) {
                add(name, container, content);
            };

            /**
             * 
             * Remove order box by name and container. if do not choose container remove all order boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.remove = function (name, container) {
                remove(name, container);
            };

            /**
             * 
             * Visible order box by name and container. if do not choose container visible all order boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.show = function (name, container) {
                show(name, container);
            };

            /**
             * 
             * Invisible order box by name and container. if do not choose container invisible all order boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.hide = function (name, container) {
                hide(name, container);
            };

            /**
             * 
             * Toggle visible order box by name and container. if do not choose container toggle visible all order boxes.
             * @param {string} name
             * @param {selector} container
             * @return {undefined}
             */
             this.toggle = function (name, container) {
                toggle(name, container);
            };

            /**
             * 
             * Return state of visibility a order box by name with container or without container.
             * @param {string} name
             * @param {selector} container
             * @return {boolean}
             */
             this.isVisible = function (name, container) {
                return isVisible(name, container);
            };

            /**
             * 
             * 
             * @param {string} name
             * @param {selector} container
             * @param {boolean} visible
             */
             this.addDefault = function (name, container, visible) {
                var orderBox = $('<ul>').addClass('griew-order-default-box');
                var btnAscSort = $('<li>').addClass('griew-order-default-btn-sort').addClass('griew-order-default-asc-sort');
                var btnDescSort = $('<li>').addClass('griew-order-default-btn-sort').addClass('griew-order-default-desc-sort');
                var btnClearSort = $('<li>').addClass('griew-order-default-btn-sort').addClass('griew-order-default-clear-sort');

                btnAscSort.append($('<a>').text(trans('order.ascending')));
                btnDescSort.append($('<a>').text(trans('order.descending')));
                btnClearSort.append($('<a>').text(trans('order.clear sort')));

                btnAscSort.click(function(){
                    _Order.addAscending(name);
                    hide(name, container);
                });

                btnDescSort.click(function(){
                    _Order.addDescending(name);
                    hide(name, container);
                });

                btnClearSort.click(function(){
                    _Order.remove(name);
                    hide(name, container);
                });

                orderBox.append(btnAscSort).append(btnDescSort).append(btnClearSort);

                add(name, container, orderBox);

                if (visible) {
                    show(name, container);
                }
            };

            this.autoGenerate = function (columns, getContainer) {
                var column = null;
                var container = '';

                for(var i in columns) { 
                    column = _columns.get(columns[i]);
                    container = getContainer(column.name);

                    var $button = $('<button>');
                    $button.addClass('griew-order-button');
                    $button.data('OrderBoxName', column.name);
                    $button.data('OrderBoxContainer', container);
                    $button.click(function () {
                        var orderBoxName = $(this).data('OrderBoxName');
                        var orderBoxContainer = $(this).data('OrderBoxContainer');
                        if(isVisible(orderBoxName, orderBoxContainer)) {
                            hide(orderBoxName, orderBoxContainer);
                        } else {
                            show(orderBoxName, orderBoxContainer);
                        }
                    });

                    $(container).append($button);

                    _orders.addDefault(column.name, container, false);
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
                //get pagination data from options
                options = options || {};

                container = options.container || '.pagination';
                buttonGroupTemplate = options.buttonGroupTemplate || '<ul class="griew-pagination">{pagination-items}</ul>';
                numberButtonTemplate = options.numberButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}">{pagination-number}</a></li>';
                nextButtonTemplate = options.nextButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}">{pagination-next}</a></li>';
                previousButtonTemplate = options.previousButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}">{pagination-previous}</a></li>';
                firstButtonTemplate = options.firstButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}">{pagination-first}</a></li>';
                lastButtonTemplate = options.lastButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}">{pagination-last}</a></li>';
                jumpNextButtonTemplate = options.jumpNextButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}">{pagination-jump-next}</a></li>';
                jumpPreviousButtonTemplate = options.jumpPreviousButtonTemplate || '<li class="griew-pagination-item"><a class="griew-pagination-link" data-page="{pagination-page}">{pagination-jump-previous}</a></li>';
                manualNavigationTemplate = options.manualNavigationTemplate || '<li class="griew-pagination-item griew-pagination-manual"><input type="number" class="griew-pagination-manual-input" value="{pagination-current}" min="1" max="{pagination-last}"><span class="griew-pagination-manual-separator"></span><span class="griew-pagination-manual-last">{pagination-last}</span></li>'
            };

            var render = function (options) {
                var page = _Pagination.getPage();
                var items = '';
                var index = 0;
                var length = 5;

                options = options || {};

                // options.onePageNavigation;
                // options.multiPagesNavigation;
                // options.manualNavigation;
                // options.jumpPagesCount;
                
                index = page.currentPage - 2;
                for(;;) {
                    if(index <= 0) {
                        index++;
                        continue;
                    }

                    if(index > length) {
                        break;
                    }

                    items = items + parse({'pagination-page': index, 'pagination-number': index}, numberButtonTemplate);

                    index++;
                }

                var $buttonGroup = $(parse('pagination-items', items, buttonGroupTemplate));
                $buttonGroup.find('.griew-pagination-link[data-page=' + page.currentPage + ']').parent().addClass('active');

                return $buttonGroup[0];
            };

            var generate = function () {
                var options = _Options.get('pagination');
                initTemplateItems(options);
                $(container).html(render(options));
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
            if(paginationOptions.visibility == undefined || paginationOptions.visibility == true) {
                _pagination.generate();
            }

            for (; index < data.length; index++) {
                $rowContainer.append(_row.render(columns, data[index], index + 1, _columns.render));
            }
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
            return {
                container: function (selector) {
                    if (selector && typeof selector === 'string') {
                        _row.container = selector;
                    }
                    return _row.container;
                },
                template: function (template) {
                    if (template && typeof template === 'string') {
                        _row.template = template;
                    } else {
                        return _row.template;
                    }
                },
                beforRender: _row.beforRender,
                afterRender: _row.afterRender,
            };
        };

        this.columns = function () {
            return {
                add: _columns.add,
                toArray: function() { return _columns.toArray(); }
            };
        };

        this.render = function (data) {
            //clone of data
            _data = Object.assign([], data);
            render(_data);
        };
    };

    var Filter = function () {
        var _filters = [];

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
            }
            else {
                _filters.push(filter);
            }
        };
        
        var remove = function (name) {
            for (var i in _filters) {
                if (_filters[i].name === name) {
                    _filters.splice(i, 1);
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
            _filters = [];
        };
        
        var toArray = function () {
            return _filters;
        };
        
        this.add = add;
        this.remove = remove;
        this.clear = clear;
        this.find = find;
        this.toArray = toArray;
    };
    
    var Order = function () {
        var _orders = [];
        
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
            }
            else {
                _orders.push(order);
            }
        };
        
        var remove = function (name) {
            for (var i in _orders) {
                if (_orders[i].name === name) {
                    _orders.splice(i, 1);
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
        };
        
        var clear = function () {
            _orders = [];
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
        
        var goto = function (number) {
            if (number && parseInt(number) > 0) {
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
            goto(currentPage);
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
        
        this.gotoPage = goto;
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
    var trans = function (key, locale) {
        return _Localization.trans(key, locale);
    };
    //--------------------------------------------------------------------------------------------------------------------------
    _DataProvider.setDefault('json');
    //--------------------------------------------------------------------------------------------------------------------------
    this.view = function () {
        return _View
    };

    this.filter = _Filter;
    this.order = _Order;
    this.pagination = _Pagination;

    this.options = _Options;

    this.setLocale = _Localization.setLocale;
    this.getLocale = _Localization.getLocale;
    this.isLocale = _Localization.isLocale;
    this.trans = _Localization.trans;

    this.refresh = function () {
        var response = _DataProvider.run(new Request().collect());
        _View.render(response.getData());
    };
};
//--------------------------------------------------------------------------------------------------------------------------
Griew.langs = {};
Griew.dataProviders = {};

Griew.setLang = function (name, trans) {
    Griew.langs[name] = trans;
};

Griew.setDataProvider = function (name, dataProvider) {
    Griew.dataProviders[name] = dataProvider;
};
