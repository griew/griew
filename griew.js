var Griew = function () {

    var View = function () {

        var Filter = function () {
            var _onshow = function (name, container) {};
            var _onhide = function (name, container) {};

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
            var _onshow = function (name, container) {};
            var _onhide = function (name, container) {};

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

        var _filters = new Filter();
        var _orders = new Order();

        this.filters = function () {
            return _filters
        };
        this.orders = function () {
            return _orders
        };
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