"use strict"
var Griew = function () {

    var View = function () {

        var Collection = function () {

            var Row = function () {
                var _className = 'griew-data-row';
                var _container = 'tbody';
                var _template = '<tr>{columns}</tr>';
                var _beforRender = function (item, template) { return template; };
                var _afterRender = function (html) { return html; };

                /**
                 * 
                 * @param {array} columns (visible columns)
                 * @param {object} data (data row)
                 * @param {number} number (row number)
                 * @param {function} renderColumn
                 * @returns {string} (HTML)
                 * 
                 */
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

                var add = function (name, type, order, visibility, template, beforRender, afterRender) {
                    _columns[name] = {
                        name: name,
                        type: type,
                        order: order || 1,
                        visibility: visibility === undefined ? true : visibility,
                        template: template || '<td>{' + name + '}</td>',
                        beforRender: beforRender || function (name, data, template, rowNumber, colNumber) { return template; },
                        afterRender: afterRender || function (name, html, rowNumber, colNumber) { return html; }
                    };
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
                }

                /**
                 * 
                 * @param {string} name (column name)
                 * @param {any} value
                 * @param {number} rowNumber
                 * @param {number} colNumber
                 * @returns {string} HTML
                 */
                var render = function (name, rowDataOrigin, rowNumber, colNumber) {
                    // TODO: validate name and value
                    var renderedColumn = '';
                    var column = _columns[name];
                    var rowData = Object.assign({}, rowDataOrigin);
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

                this.add = function (name, type, order, visibility, template, beforRender, afterRender) {
                    //TODO name param maybe string, col object or array of col objects.
                    add(name, type, order, visibility, template, beforRender, afterRender);
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

                this.render = render;
            };

            var _row = new Row();
            var _columns = new Columns;

            var parse = function (name, value, source) {
                //TODO validation for source
                var key = new RegExp('[{]{1}[ ]*[a-zA-Z0-9._-]+[ ]*[}]{1}', 'gi');
                var keyWithName = new RegExp('[{]{1}[ ]*(' + name + '){1}[ ]*[}]{1}', 'gi');
                if (typeof name === 'string') {
                    return source.replace(keyWithName, value);
                }
                source = value;
                var value = name;
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
                $rowContainer.html('');
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
            };

            var add = function (name, container, content) {
                var filterBox = $('<div>').addClass(_boxClassName).addClass(filterClassName(name)).append(typeof content === 'function' ? content() : content);
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

                operators.append($('<option>').text('Start With').val('start'));
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
                add: _collection.columns.add
            };
        };

        this.render = function (data) {
            _data = data;
            render();
        }
    };
    //--------------------------------------------------------------------------------------------------------------------------
    var _locale = 'fa';
    var _view = new View();
    //--------------------------------------------------------------------------------------------------------------------------
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
    //--------------------------------------------------------------------------------------------------------------------------
    this.view = function () {
        return _view
    };

    this.setLocale = setLocale;
    this.getLocale = getLocale;
    this.isLocale = isLocale;
    this.trans = trans;
};
//--------------------------------------------------------------------------------------------------------------------------
Griew.langs = {};
Griew.setLang = function (name, trans) {
    Griew.langs[name] = trans;
};