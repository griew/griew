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
        var _paginate = {};
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
<<<<<<< HEAD
        
        var setPaginate = function (paginate) {
            _paginate = paginate;
        };
        var getPaginate = function () {
            return _paginate;
        };
        
=======
        
        var setPaginate = function (paginate) {
            _paginate = paginate;
        };
        var getPaginate = function () {
            return _paginate;
        };
        
>>>>>>> 2cf56caab9b1532c8a4f0a514c193ac889035462
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
                getPaginate(),
                _extra
            ];
        };
        var toObject = function () {
            return {
                columns : getColumns(),
                filters : getFilters(),
                orders : getOrders(),
                pagination : getPaginate(),
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
            setPaginate(_Paginate.getPage());
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
        var _paginate = {};
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
        
        var setPaginate = function (paginate) {
            _paginate = paginate;
        };
        var getPaginate = function () {
            return _paginate;
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
        
        this.setPaginate = setPaginate;
        this.getPaginate = getPaginate;
        
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
<<<<<<< HEAD
        };

        var getDataProvider = function (name) {
            if(!exists(name)) {
                return null;
            }

            return new Griew.dataProviders[name](_options);
        };

        var run = function (request, name) {
            var dataProvider = name === undefined ? getDefaultDataProvider() : getDataProvider(name);
            return dataProvider === null ? dataProvider : dataProvider.run(request, new Response());
        };

=======
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

>>>>>>> 2cf56caab9b1532c8a4f0a514c193ac889035462
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

            var processPaginate = function (data, paginate) {
                return data;
            };

            var processColumns = function (data, columns) {
                return columns;
            };

            var run = function (request, response) {
                var tempData;
                var requestObject = request.toObject();

<<<<<<< HEAD
=======
                console.log(requestObject);

>>>>>>> 2cf56caab9b1532c8a4f0a514c193ac889035462
                tempData = processFilters(data, requestObject.filters);
                tempData = processOrders(tempData, requestObject.orders);
                tempData = processPaginate(tempData, requestObject.pagination);

                response.setData(tempData);
                response.addFilters(requestObject.filters);
                response.addOrders(requestObject.orders);
                response.setPaginate(requestObject.pagination);
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

        var Collection = function () {

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

                var add = function (name, caption, schema, type, order, visibility, sortable, filterable, template, beforRender, afterRender) {
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

                this.add = function (name, caption, schema, type, order, visibility, sortable, filterable, template, beforRender, afterRender) {
                    //TODO name param maybe string, col object or array of col objects.
                    add(name, caption, schema, type, order, visibility, sortable, filterable, template, beforRender, afterRender);
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
            };

            var _row = new Row();
            var _columns = new Columns();
            var _header = new Header();

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
                
                for (; index < data.length; index++) {
                    $rowContainer.append(_row.render(columns, data[index], index + 1, _columns.render));
                }
            };

            this.render = render;
            this.columns = _columns;
            this.row = _row;
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
                    $(filterClassName(name, true)).hasClass('active');
                    return;
                }

                $(container + '>' + filterClassName(name, true)).hasClass('active');
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

            /**
             * 
             * 
             * @param {string} name
             * @param {selector} container
             * @param {boolean} visible
             */
             this.addString = function (name, container, visible) {

                var stringBox = $('<div>').addClass('griew-filter-string-box');
                var operators = $('<select>').addClass('griew-filter-string-operators');
                var operand = $('<input type="text">').addClass('griew-filter-string-operand');
                var btnAccept = $('<button type="button">').addClass('griew-filter-string-btn-accept');
                var btnClear = $('<button type="button">').addClass('griew-filter-string-btn-clear');

                var options = trans('filter.string.operators');
                for (var i in options) {
                    operators.append($('<option>').text(options[i]).val(i));
                }
                btnAccept.text(trans('accept')).click(function () {
                    hide(name, container);
                });
                btnClear.text('Clear');

                stringBox.append(operators).append(operand).append(btnAccept).append(btnClear);

                add(name, container, stringBox);

                if (visible) {
                    show(name, container);
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
                    $(orderClassName(name, true)).hasClass('active');
                    return;
                }

                $(container + '>' + orderClassName(name, true)).hasClass('active');
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

                orderBox.append(btnAscSort).append(btnDescSort).append(btnClearSort);

                add(name, container, orderBox);

                if (visible) {
                    show(name, container);
                }
            };
        };

        var _collection = new Collection();
        var _filters = new Filter();
        var _orders = new Order();
        var _data = [];

        var render = function () {
            _collection.render(_data);
        };

        this.filters = function () {
            return _filters
        };

        this.orders = function () {
            return _orders
        };

        this.row = function () {
            return {
                container: function (selector) {
                    if (selector && typeof selector === 'string') {
                        _collection.row.container = selector;
                    }
                    return _collection.row.container;
                },
                template: function (template) {
                    if (template && typeof template === 'string') {
                        _collection.row.template = template;
                    } else {
                        return _collection.row.template;
                    }
                },
                beforRender: _collection.row.beforRender,
                afterRender: _collection.row.afterRender,
            };
        };

        this.columns = function () {
            return {
                add: _collection.columns.add,
                toArray: function() { return _collection.columns.toArray(); }
            };
        };

        this.render = function (data) {
            //clone of data
            _data = Object.assign([], data);
            render();
        };
    };

    var Filter = function () {
        var _filters = [];
        //------------ Filter Types ------------\\
        var STRING = 'string';
        var NUMBER = 'number';
        var DATE = 'date';
        var ENUM = 'enum';
        var BOOLEAN = 'boolean';
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
        
        /**
         *
         * @param name
         * @param type
         * @param operator
         * @param operand1
         * @param operand2
         */
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
        
        /**
         *
         * @param name
         * @returns {boolean}
         */
        var remove = function (name) {
            for (var i in _filters) {
                if (_filters[i].name === name) {
                    _filters.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @returns return Filter if true and null if false
         */
        var find = function (name) {
            for (var i in _filters) {
                if (_filters[i].name === name) {
                    return _filters[i];
                }
            }
            return null;
        };
        
        /**
         *
         * @description Remove all filters
         *
         */
        var clear = function () {
            _filters = [];
        };
        
        /**
         *
         * @returns {Array} filters
         */
        var toArray = function () {
            return _filters;
        };
        
        //-- Public methods --------------------------------------------------------------------------------------------
        
        /**
         *
         * @param name
         * @param string
         * @returns {boolean}
         */
        this.addEqualString = function (name, string) {
            if (name && string) {
                add(name, STRING, IS_EQUAL_TO, string, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param string
         * @returns {boolean}
         */
        this.addNotEqualString = function (name, string) {
            if (name && string) {
                add(name, STRING, IS_NOT_EQUAL_TO, string, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param string
         * @returns {boolean}
         */
        this.addStartWithString = function (name, string) {
            if (name && string) {
                add(name, STRING, START_WITH, string, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param string
         * @returns {boolean}
         */
        this.addDoesNotContainsString = function (name, string) {
            if (name && string) {
                add(name, STRING, DOES_NOT_CONTAINS, string, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param string
         * @returns {boolean}
         */
        this.addEndsWithString = function (name, string) {
            if (name && string) {
                add(name, STRING, ENDS_WITH, string, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param string
         * @returns {boolean}
         */
        this.addContainsString = function (name, string) {
            if (name && string) {
                add(name, STRING, CONTAINS, string, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param number
         * @returns {boolean}
         */
        this.addEqualNumber = function (name, number) {
            if (name && number) {
                add(name, NUMBER, IS_EQUAL_TO, number, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param number
         * @returns {boolean}
         */
        this.addNotEqualNumber = function (name, number) {
            if (name && number) {
                add(name, NUMBER, IS_NOT_EQUAL_TO, number, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param from
         * @param to
         * @returns {boolean}
         */
        this.addBetweenNumber = function (name, from, to) {
            if (name && from && to) {
                add(name, NUMBER, BETWEEN, from, to);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param number
         * @returns {boolean}
         */
        this.addGreaterThanOrEqualNumber = function (name, number) {
            if (name && number) {
                add(name, NUMBER, IS_GREATER_THAN_OR_EQUAL_TO, number, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param number
         * @returns {boolean}
         */
        this.addGreaterThanNumber = function (name, number) {
            if (name && number) {
                add(name, NUMBER, IS_GREATER_THAN, number, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param number
         * @returns {boolean}
         */
        this.addLessThanOrEqualNumber = function (name, number) {
            if (name && number) {
                add(name, NUMBER, IS_LESS_THAN_OR_EQUAL_TO, number, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param number
         * @returns {boolean}
         */
        this.addLessThanNumber = function (name, number) {
            if (name && number) {
                add(name, NUMBER, IS_LESS_THAN, number, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param date
         * @returns {boolean}
         */
        this.addEqualDate = function (name, date) {
            if (name && date) {
                add(name, DATE, IS_EQUAL_TO, date, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param date
         * @returns {boolean}
         */
        this.addNotEqualDate = function (name, date) {
            if (name && date) {
                add(name, DATE, IS_NOT_EQUAL_TO, date, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param from
         * @param to
         * @returns {boolean}
         */
        this.addBetweenDate = function (name, from, to) {
            if (name && from && to) {
                add(name, DATE, BETWEEN, from, to);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param date
         * @returns {boolean}
         */
        this.addAfterThanOrEqualDate = function (name, date) {
            if (name && date) {
                add(name, DATE, IS_AFTER_THAN_OR_EQUAL_TO, date, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param date
         * @returns {boolean}
         */
        this.addAfterThanDate = function (name, date) {
            if (name && date) {
                add(name, DATE, IS_AFTER_THAN, date, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param date
         * @returns {boolean}
         */
        this.addBeforeThanOrEqualDate = function (name, date) {
            if (name && date) {
                add(name, DATE, IS_BEFORE_THAN_OR_EQUAL_TO, date, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param date
         * @returns {boolean}
         */
        this.addBeforeThanDate = function (name, date) {
            if (name && date) {
                add(name, DATE, IS_BEFORE_THAN, date, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param items
         * @returns {boolean}
         */
        this.addInItems = function (name, items) {
            if (name && items) {
                add(name, ENUM, IN, items, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param items
         * @returns {boolean}
         */
        this.addNotInItems = function (name, items) {
            if (name && items) {
                add(name, ENUM, NOT_IN, items, null);
                return true;
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param value
         * @returns {boolean}
         */
        this.addIsBoolean = function (name, value) {
            if (name && value) {
                add(name, BOOLEAN, IS_EQUAL_TO, value, null);
                return true
            }
            return false;
        };
        
        /**
         *
         * @param name
         * @param value
         * @returns {boolean}
         */
        this.addIsNotBoolean = function (name, value) {
            if (name && value) {
                add(name, BOOLEAN, IS_NOT_EQUAL_TO, value, null);
                return true
            }
            return false;
        };
        
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
                type: type
            };
            if (find(name)) {
                order = find(name);
                order.name = name;
                order.type = type;
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
    
    var Paginate = function () {
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
    var _Paginate = new Paginate();
    var _Options = new Options();
    //--------------------------------------------------------------------------------------------------------------------------
    var trans = function (key, locale) {
        return _Localization.trans(key, locale);
    };
    //--------------------------------------------------------------------------------------------------------------------------
<<<<<<< HEAD
    _dataProvider.setDefault('json');
=======
    _DataProvider.setDefault('json');
>>>>>>> 2cf56caab9b1532c8a4f0a514c193ac889035462
    //--------------------------------------------------------------------------------------------------------------------------
    this.view = function () {
        return _View
    };

<<<<<<< HEAD
    this.options = _options;

    this.setLocale = _localization.setLocale;
    this.getLocale = _localization.getLocale;
    this.isLocale = _localization.isLocale;
    this.trans = _localization.trans;

    this.refresh = function () {
        var response = _dataProvider.run(new Request().collect());
        _view.render(response.getData());
=======
    this.options = _Options;

    this.setLocale = _Localization.setLocale;
    this.getLocale = _Localization.getLocale;
    this.isLocale = _Localization.isLocale;
    this.trans = _Localization.trans;

    this.refresh = function () {
        var response = _DataProvider.run(new Request().collect());
        _View.render(response.getData());
>>>>>>> 2cf56caab9b1532c8a4f0a514c193ac889035462
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
