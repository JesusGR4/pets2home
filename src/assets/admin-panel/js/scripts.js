// (function ($) {
//
//     'use strict';
//
//     $(document).ready(function () {
//         // Initializes search overlay plugin.
//         // Replace onSearchSubmit() and onKeyEnter() with
//         // your logic to perform a search and display results
//         $(".list-view-wrapper").scrollbar();
//
//         $('[data-pages="search"]').search({
//             // Bind elements that are included inside search overlay
//             searchField: '#overlay-search',
//             closeButton: '.overlay-close',
//             suggestions: '#overlay-suggestions',
//             brand: '.brand',
//             // Callback that will be run when you hit ENTER button on search box
//             onSearchSubmit: function (searchString) {
//                 console.log("Search for: " + searchString);
//             },
//             // Callback that will be run whenever you enter a key into search box.
//             // Perform any live search here.
//             onKeyEnter: function (searchString) {
//                 console.log("Live search for: " + searchString);
//                 var searchField = $('#overlay-search');
//                 var searchResults = $('.search-results');
//
//                 /*
//                  Do AJAX call here to get search results
//                  and update DOM and use the following block
//                  'searchResults.find('.result-name').each(function() {...}'
//                  inside the AJAX callback to update the DOM
//                  */
//
//                 // Timeout is used for DEMO purpose only to simulate an AJAX call
//                 clearTimeout($.data(this, 'timer'));
//                 searchResults.fadeOut("fast"); // hide previously returned results until server returns new results
//                 var wait = setTimeout(function () {
//
//                     searchResults.find('.result-name').each(function () {
//                         if (searchField.val().length != 0) {
//                             $(this).html(searchField.val());
//                             searchResults.fadeIn("fast"); // reveal updated results
//                         }
//                     });
//                 }, 500);
//                 $(this).data('timer', wait);
//
//             }
//         })
//
//     });
//
//
//     $('.panel-collapse label').on('click', function (e) {
//         e.stopPropagation();
//     })
//
// })(window.jQuery);

var TableJS = function ($, window) {


    var $TABLE = $('#table');
    var $BTN = $('#export-btn');
    var $EXPORT = $('#export');

    $('.table-add').click(function () {
        var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
        $TABLE.find('table').append($clone);
    });

    $('.table-remove').click(function () {
        $(this).parents('tr').detach();
    });

    $('.table-up').click(function () {
        var $row = $(this).parents('tr');
        if ($row.index() === 1) return; // Don't go above the header
        $row.prev().before($row.get(0));
    });

    $('.table-down').click(function () {
        var $row = $(this).parents('tr');
        $row.next().after($row.get(0));
    });

// A few jQuery helpers for exporting only
    jQuery.fn.pop = [].pop;
    jQuery.fn.shift = [].shift;

    $BTN.click(function () {
        var $rows = $TABLE.find('tr:not(:hidden)');
        var headers = [];
        var data = [];

        // Get the headers (add special header logic here)
        $($rows.shift()).find('th:not(:empty)').each(function () {
            headers.push($(this).text().toLowerCase());
        });

        // Turn all existing rows into a loopable array
        $rows.each(function () {
            var $td = $(this).find('td');
            var h = {};

            // Use the headers from earlier to name our hash keys
            headers.forEach(function (header, i) {
                h[header] = $td.eq(i).text();
            });

            data.push(h);
        });

        // Output the result
        $EXPORT.text(JSON.stringify(data));
    });

    $('.popover_parent a').on('click', function() {
        $('.popover_parent > a').not(this).parent().removeClass('active');
        $(this).parent().toggleClass('active');
    });

//Hide the dropdown when clicked off
    $(document).on('click touchstart', function(event) {
        if (!$(event.target).closest('.popover_parent').length) {
            // Hide the menus.
            $('.popover_parent.active').removeClass('active');
        }
    });

};

var multiSelectJS = function ($, window) {

    /* ============================================================
     * Form Elements
     * This file applies various jQuery plugins to form elements
     * For DEMO purposes only. Extract what you need.
     * ============================================================ */
    (function($) {

        'use strict';

        var getBaseURL = function() {
            var url = document.URL;
            return url.substr(0, url.lastIndexOf('/'));
        }

        $(document).ready(function() {

            //Multiselect - Select2 plug-in
            $("#multi").val(["Jim", "Lucy"]).select2();

            //Date Pickers
            $('#datepicker-range, #datepicker-component, #datepicker-component2').datepicker();

            $('#datepicker-embeded').datepicker({
                daysOfWeekDisabled: "0,1"
            });


            $('#daterangepicker').daterangepicker({
                timePicker: true,
                timePickerIncrement: 30,
                format: 'MM/DD/YYYY h:mm A'
            }, function(start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });

            /* Time picker
             * https://github.com/m3wolf/bootstrap3-timepicker
             */
            $('#timepicker').timepicker().on('show.timepicker', function(e) {
                var widget = $('.bootstrap-timepicker-widget');
                widget.find('.glyphicon-chevron-up').removeClass().addClass('pg-arrow_maximize');
                widget.find('.glyphicon-chevron-down').removeClass().addClass('pg-arrow_minimize');
            });



            // disabling dates
            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            //Input mask - Input helper
            $(function($) {
                $("#date").mask("99/99/9999");
                $("#phone").mask("(999) 999-9999");
                $("#tin").mask("99-9999999");
                $("#ssn").mask("999-99-9999");
            });
            //Autonumeric plug-in - automatic addition of dollar signs,etc controlled by tag attributes
            $('.autonumeric').autoNumeric('init');

            //Drag n Drop up-loader
            $("div#myId").dropzone({
                url: "/file/post"
            });
            //Single instance of tag inputs - can be initiated with simply using data-role="tagsinput" attribute in any input field
            $('.custom-tag-input').tagsinput({

            });

            var myCustomTemplates = {
                "font-styles": function(locale) {
                    return '<li class="dropdown">' + '<a data-toggle="dropdown" class="btn btn-default dropdown-toggle ">' + '<span class="editor-icon editor-icon-headline"></span>' + '<span class="current-font">Normal</span>' + '<b class="caret"></b>' + '</a>' + '<ul class="dropdown-menu">' + '<li><a tabindex="-1" data-wysihtml5-command-value="p" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Normal</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h1" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">1</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h2" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">2</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h3" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">3</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h4" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">4</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h5" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">5</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h6" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">6</a></li>' + '</ul>' + '</li>';
                },
                emphasis: function(locale) {
                    return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="CTRL+B" data-wysihtml5-command="bold" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-bold"></i></a>' + '<a tabindex="-1" title="CTRL+I" data-wysihtml5-command="italic" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-italic"></i></a>' + '<a tabindex="-1" title="CTRL+U" data-wysihtml5-command="underline" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-underline"></i></a>' + '</div>' + '</li>';
                },
                blockquote: function(locale) {
                    return '<li>' + '<a tabindex="-1" data-wysihtml5-display-format-name="false" data-wysihtml5-command-value="blockquote" data-wysihtml5-command="formatBlock" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-quote"></i>' + '</a>' + '</li>'
                },
                lists: function(locale) {
                    return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Unordered list" data-wysihtml5-command="insertUnorderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ul"></i></a>' + '<a tabindex="-1" title="Ordered list" data-wysihtml5-command="insertOrderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ol"></i></a>' + '<a tabindex="-1" title="Outdent" data-wysihtml5-command="Outdent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-outdent"></i></a>' + '<a tabindex="-1" title="Indent" data-wysihtml5-command="Indent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-indent"></i></a>' + '</div>' + '</li>'
                },
                image: function(locale) {
                    return '<li>' + '<div class="bootstrap-wysihtml5-insert-image-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert image</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-image-url form-control" value="http://">' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary">Insert image</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert image" data-wysihtml5-command="insertImage" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-image"></i>' + '</a>' + '</li>'
                },
                link: function(locale) {
                    return '<li>' + '<div class="bootstrap-wysihtml5-insert-link-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert link</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-link-url form-control" value="http://">' + '<label class="checkbox"> <input type="checkbox" checked="" class="bootstrap-wysihtml5-insert-link-target">Open link in new window</label>' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary" href="#">Insert link</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert link" data-wysihtml5-command="createLink" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-link"></i>' + '</a>' + '</li>'
                },
                html: function(locale) {
                    return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Edit HTML" data-wysihtml5-action="change_view" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-html"></i>' + '</a>' + '</div>' + '</li>'
                }
            }
            //TODO: chrome doesn't apply the plugin on load
            setTimeout(function() {
                $('#wysiwyg5').wysihtml5({
                    html: true,
                    stylesheets: ["pages/css/editor.css"],
                    customTemplates: myCustomTemplates
                });
            }, 500);


            $('#summernote').summernote({
                height: 200,
                onfocus: function(e) {
                    $('body').addClass('overlay-disabled');
                },
                onblur: function(e) {
                    $('body').removeClass('overlay-disabled');
                }
            });


        });

    })(window.jQuery);

    !function ($) {

        "use strict";


        /* MULTISELECT CLASS DEFINITION
         * ====================== */

        var MultiSelect = function (element, options) {
            this.options = options;
            this.$element = $(element);
            this.$container = $('<div/>', {'class': "ms-container"});
            this.$selectableContainer = $('<div/>', {'class': 'ms-selectable'});
            this.$selectionContainer = $('<div/>', {'class': 'ms-selection'});
            this.$selectableUl = $('<ul/>', {'class': "ms-list", 'tabindex': '-1'});
            this.$selectionUl = $('<ul/>', {'class': "ms-list", 'tabindex': '-1'});
            this.scrollTo = 0;
            this.elemsSelector = 'li:visible:not(.ms-optgroup-label,.ms-optgroup-container,.' + options.disabledClass + ')';
        };

        MultiSelect.prototype = {
            constructor: MultiSelect,

            init: function () {
                var that = this,
                    ms = this.$element;

                if (ms.next('.ms-container').length === 0) {
                    ms.css({position: 'absolute', left: '-9999px'});
                    ms.attr('id', ms.attr('id') ? ms.attr('id') : Math.ceil(Math.random() * 1000) + 'multiselect');
                    this.$container.attr('id', 'ms-' + ms.attr('id'));
                    this.$container.addClass(that.options.cssClass);
                    ms.find('option').each(function () {
                        that.generateLisFromOption(this);
                    });

                    this.$selectionUl.find('.ms-optgroup-label').hide();

                    if (that.options.selectableHeader) {
                        that.$selectableContainer.append(that.options.selectableHeader);
                    }
                    that.$selectableContainer.append(that.$selectableUl);
                    if (that.options.selectableFooter) {
                        that.$selectableContainer.append(that.options.selectableFooter);
                    }

                    if (that.options.selectionHeader) {
                        that.$selectionContainer.append(that.options.selectionHeader);
                    }
                    that.$selectionContainer.append(that.$selectionUl);
                    if (that.options.selectionFooter) {
                        that.$selectionContainer.append(that.options.selectionFooter);
                    }

                    that.$container.append(that.$selectableContainer);
                    that.$container.append(that.$selectionContainer);
                    ms.after(that.$container);

                    that.activeMouse(that.$selectableUl);
                    that.activeKeyboard(that.$selectableUl);

                    var action = that.options.dblClick ? 'dblclick' : 'click';

                    that.$selectableUl.on(action, '.ms-elem-selectable', function () {
                        that.select($(this).data('ms-value'));
                    });
                    that.$selectionUl.on(action, '.ms-elem-selection', function () {
                        that.deselect($(this).data('ms-value'));
                    });

                    that.activeMouse(that.$selectionUl);
                    that.activeKeyboard(that.$selectionUl);

                    ms.on('focus', function () {
                        that.$selectableUl.focus();
                    });
                }

                var selectedValues = ms.find('option:selected').map(function () {
                    return $(this).val();
                }).get();
                that.select(selectedValues, 'init');

                if (typeof that.options.afterInit === 'function') {
                    that.options.afterInit.call(this, this.$container);
                }
            },

            'generateLisFromOption': function (option, index, $container) {
                var that = this,
                    ms = that.$element,
                    attributes = "",
                    $option = $(option);

                for (var cpt = 0; cpt < option.attributes.length; cpt++) {
                    var attr = option.attributes[cpt];

                    if (attr.name !== 'value' && attr.name !== 'disabled') {
                        attributes += attr.name + '="' + attr.value + '" ';
                    }
                }
                var selectableLi = $('<li ' + attributes + '><span>' + that.escapeHTML($option.text()) + '</span></li>'),
                    selectedLi = selectableLi.clone(),
                    value = $option.val(),
                    elementId = that.sanitize(value);

                selectableLi
                    .data('ms-value', value)
                    .addClass('ms-elem-selectable')
                    .attr('id', elementId + '-selectable');

                selectedLi
                    .data('ms-value', value)
                    .addClass('ms-elem-selection')
                    .attr('id', elementId + '-selection')
                    .hide();

                if ($option.prop('disabled') || ms.prop('disabled')) {
                    selectedLi.addClass(that.options.disabledClass);
                    selectableLi.addClass(that.options.disabledClass);
                }

                var $optgroup = $option.parent('optgroup');

                if ($optgroup.length > 0) {
                    var optgroupLabel = $optgroup.attr('label'),
                        optgroupId = that.sanitize(optgroupLabel),
                        $selectableOptgroup = that.$selectableUl.find('#optgroup-selectable-' + optgroupId),
                        $selectionOptgroup = that.$selectionUl.find('#optgroup-selection-' + optgroupId);

                    if ($selectableOptgroup.length === 0) {
                        var optgroupContainerTpl = '<li class="ms-optgroup-container"></li>',
                            optgroupTpl = '<ul class="ms-optgroup"><li class="ms-optgroup-label"><span>' + optgroupLabel + '</span></li></ul>';

                        $selectableOptgroup = $(optgroupContainerTpl);
                        $selectionOptgroup = $(optgroupContainerTpl);
                        $selectableOptgroup.attr('id', 'optgroup-selectable-' + optgroupId);
                        $selectionOptgroup.attr('id', 'optgroup-selection-' + optgroupId);
                        $selectableOptgroup.append($(optgroupTpl));
                        $selectionOptgroup.append($(optgroupTpl));
                        if (that.options.selectableOptgroup) {
                            $selectableOptgroup.find('.ms-optgroup-label').on('click', function () {
                                var values = $optgroup.children(':not(:selected, :disabled)').map(function () {
                                    return $(this).val();
                                }).get();
                                that.select(values);
                            });
                            $selectionOptgroup.find('.ms-optgroup-label').on('click', function () {
                                var values = $optgroup.children(':selected:not(:disabled)').map(function () {
                                    return $(this).val();
                                }).get();
                                that.deselect(values);
                            });
                        }
                        that.$selectableUl.append($selectableOptgroup);
                        that.$selectionUl.append($selectionOptgroup);
                    }
                    index = index === undefined ? $selectableOptgroup.find('ul').children().length : index + 1;
                    selectableLi.insertAt(index, $selectableOptgroup.children());
                    selectedLi.insertAt(index, $selectionOptgroup.children());
                } else {
                    index = index === undefined ? that.$selectableUl.children().length : index;

                    selectableLi.insertAt(index, that.$selectableUl);
                    selectedLi.insertAt(index, that.$selectionUl);
                }
            },

            'addOption': function (options) {
                var that = this;

                if (options.value !== undefined && options.value !== null) {
                    options = [options];
                }
                $.each(options, function (index, option) {
                    if (option.value !== undefined && option.value !== null &&
                        that.$element.find("option[value='" + option.value + "']").length === 0) {
                        var $option = $('<option value="' + option.value + '">' + option.text + '</option>'),
                            $container = option.nested === undefined ? that.$element : $("optgroup[label='" + option.nested + "']"),
                            index = parseInt((typeof option.index === 'undefined' ? $container.children().length : option.index));

                        if (option.optionClass) {
                            $option.addClass(option.optionClass);
                        }

                        if (option.disabled) {
                            $option.prop('disabled', true);
                        }

                        $option.insertAt(index, $container);
                        that.generateLisFromOption($option.get(0), index, option.nested);
                    }
                });
            },

            'escapeHTML': function (text) {
                return $("<div>").text(text).html();
            },

            'activeKeyboard': function ($list) {
                var that = this;

                $list.on('focus', function () {
                    $(this).addClass('ms-focus');
                })
                    .on('blur', function () {
                        $(this).removeClass('ms-focus');
                    })
                    .on('keydown', function (e) {
                        switch (e.which) {
                            case 40:
                            case 38:
                                e.preventDefault();
                                e.stopPropagation();
                                that.moveHighlight($(this), (e.which === 38) ? -1 : 1);
                                return;
                            case 37:
                            case 39:
                                e.preventDefault();
                                e.stopPropagation();
                                that.switchList($list);
                                return;
                            case 9:
                                if (that.$element.is('[tabindex]')) {
                                    e.preventDefault();
                                    var tabindex = parseInt(that.$element.attr('tabindex'), 10);
                                    tabindex = (e.shiftKey) ? tabindex - 1 : tabindex + 1;
                                    $('[tabindex="' + (tabindex) + '"]').focus();
                                    return;
                                } else {
                                    if (e.shiftKey) {
                                        that.$element.trigger('focus');
                                    }
                                }
                        }
                        if ($.inArray(e.which, that.options.keySelect) > -1) {
                            e.preventDefault();
                            e.stopPropagation();
                            that.selectHighlighted($list);
                            return;
                        }
                    });
            },

            'moveHighlight': function ($list, direction) {
                var $elems = $list.find(this.elemsSelector),
                    $currElem = $elems.filter('.ms-hover'),
                    $nextElem = null,
                    elemHeight = $elems.first().outerHeight(),
                    containerHeight = $list.height(),
                    containerSelector = '#' + this.$container.prop('id');

                $elems.removeClass('ms-hover');
                if (direction === 1) { // DOWN

                    $nextElem = $currElem.nextAll(this.elemsSelector).first();
                    if ($nextElem.length === 0) {
                        var $optgroupUl = $currElem.parent();

                        if ($optgroupUl.hasClass('ms-optgroup')) {
                            var $optgroupLi = $optgroupUl.parent(),
                                $nextOptgroupLi = $optgroupLi.next(':visible');

                            if ($nextOptgroupLi.length > 0) {
                                $nextElem = $nextOptgroupLi.find(this.elemsSelector).first();
                            } else {
                                $nextElem = $elems.first();
                            }
                        } else {
                            $nextElem = $elems.first();
                        }
                    }
                } else if (direction === -1) { // UP

                    $nextElem = $currElem.prevAll(this.elemsSelector).first();
                    if ($nextElem.length === 0) {
                        var $optgroupUl = $currElem.parent();

                        if ($optgroupUl.hasClass('ms-optgroup')) {
                            var $optgroupLi = $optgroupUl.parent(),
                                $prevOptgroupLi = $optgroupLi.prev(':visible');

                            if ($prevOptgroupLi.length > 0) {
                                $nextElem = $prevOptgroupLi.find(this.elemsSelector).last();
                            } else {
                                $nextElem = $elems.last();
                            }
                        } else {
                            $nextElem = $elems.last();
                        }
                    }
                }
                if ($nextElem.length > 0) {
                    $nextElem.addClass('ms-hover');
                    var scrollTo = $list.scrollTop() + $nextElem.position().top -
                        containerHeight / 2 + elemHeight / 2;

                    $list.scrollTop(scrollTo);
                }
            },

            'selectHighlighted': function ($list) {
                var $elems = $list.find(this.elemsSelector),
                    $highlightedElem = $elems.filter('.ms-hover').first();

                if ($highlightedElem.length > 0) {
                    if ($list.parent().hasClass('ms-selectable')) {
                        this.select($highlightedElem.data('ms-value'));
                    } else {
                        this.deselect($highlightedElem.data('ms-value'));
                    }
                    $elems.removeClass('ms-hover');
                }
            },

            'switchList': function ($list) {
                $list.blur();
                this.$container.find(this.elemsSelector).removeClass('ms-hover');
                if ($list.parent().hasClass('ms-selectable')) {
                    this.$selectionUl.focus();
                } else {
                    this.$selectableUl.focus();
                }
            },

            'activeMouse': function ($list) {
                var that = this;

                this.$container.on('mouseenter', that.elemsSelector, function () {
                    $(this).parents('.ms-container').find(that.elemsSelector).removeClass('ms-hover');
                    $(this).addClass('ms-hover');
                });

                this.$container.on('mouseleave', that.elemsSelector, function () {
                    $(this).parents('.ms-container').find(that.elemsSelector).removeClass('ms-hover');
                });
            },

            'refresh': function () {
                this.destroy();
                this.$element.multiSelect(this.options);
            },

            'destroy': function () {
                $("#ms-" + this.$element.attr("id")).remove();
                this.$element.off('focus');
                this.$element.css('position', '').css('left', '');
                this.$element.removeData('multiselect');
            },

            'select': function (value, method) {
                if (typeof value === 'string') {
                    value = [value];
                }

                var that = this,
                    ms = this.$element,
                    msIds = $.map(value, function (val) {
                        return (that.sanitize(val));
                    }),
                    selectables = this.$selectableUl.find('#' + msIds.join('-selectable, #') + '-selectable').filter(':not(.' + that.options.disabledClass + ')'),
                    selections = this.$selectionUl.find('#' + msIds.join('-selection, #') + '-selection').filter(':not(.' + that.options.disabledClass + ')'),
                    options = ms.find('option:not(:disabled)').filter(function () {
                        return ($.inArray(this.value, value) > -1);
                    });

                if (method === 'init') {
                    selectables = this.$selectableUl.find('#' + msIds.join('-selectable, #') + '-selectable'),
                        selections = this.$selectionUl.find('#' + msIds.join('-selection, #') + '-selection');
                }

                if (selectables.length > 0) {
                    selectables.addClass('ms-selected').hide();
                    selections.addClass('ms-selected').show();

                    options.prop('selected', true);

                    that.$container.find(that.elemsSelector).removeClass('ms-hover');

                    var selectableOptgroups = that.$selectableUl.children('.ms-optgroup-container');
                    if (selectableOptgroups.length > 0) {
                        selectableOptgroups.each(function () {
                            var selectablesLi = $(this).find('.ms-elem-selectable');
                            if (selectablesLi.length === selectablesLi.filter('.ms-selected').length) {
                                $(this).find('.ms-optgroup-label').hide();
                            }
                        });

                        var selectionOptgroups = that.$selectionUl.children('.ms-optgroup-container');
                        selectionOptgroups.each(function () {
                            var selectionsLi = $(this).find('.ms-elem-selection');
                            if (selectionsLi.filter('.ms-selected').length > 0) {
                                $(this).find('.ms-optgroup-label').show();
                            }
                        });
                    } else {
                        if (that.options.keepOrder && method !== 'init') {
                            var selectionLiLast = that.$selectionUl.find('.ms-selected');
                            if ((selectionLiLast.length > 1) && (selectionLiLast.last().get(0) != selections.get(0))) {
                                selections.insertAfter(selectionLiLast.last());
                            }
                        }
                    }
                    if (method !== 'init') {
                        ms.trigger('change');
                        if (typeof that.options.afterSelect === 'function') {
                            that.options.afterSelect.call(this, value);
                        }
                    }
                }
            },

            'deselect': function (value) {
                if (typeof value === 'string') {
                    value = [value];
                }

                var that = this,
                    ms = this.$element,
                    msIds = $.map(value, function (val) {
                        return (that.sanitize(val));
                    }),
                    selectables = this.$selectableUl.find('#' + msIds.join('-selectable, #') + '-selectable'),
                    selections = this.$selectionUl.find('#' + msIds.join('-selection, #') + '-selection').filter('.ms-selected').filter(':not(.' + that.options.disabledClass + ')'),
                    options = ms.find('option').filter(function () {
                        return ($.inArray(this.value, value) > -1);
                    });

                if (selections.length > 0) {
                    selectables.removeClass('ms-selected').show();
                    selections.removeClass('ms-selected').hide();
                    options.prop('selected', false);

                    that.$container.find(that.elemsSelector).removeClass('ms-hover');

                    var selectableOptgroups = that.$selectableUl.children('.ms-optgroup-container');
                    if (selectableOptgroups.length > 0) {
                        selectableOptgroups.each(function () {
                            var selectablesLi = $(this).find('.ms-elem-selectable');
                            if (selectablesLi.filter(':not(.ms-selected)').length > 0) {
                                $(this).find('.ms-optgroup-label').show();
                            }
                        });

                        var selectionOptgroups = that.$selectionUl.children('.ms-optgroup-container');
                        selectionOptgroups.each(function () {
                            var selectionsLi = $(this).find('.ms-elem-selection');
                            if (selectionsLi.filter('.ms-selected').length === 0) {
                                $(this).find('.ms-optgroup-label').hide();
                            }
                        });
                    }
                    ms.trigger('change');
                    if (typeof that.options.afterDeselect === 'function') {
                        that.options.afterDeselect.call(this, value);
                    }
                }
            },

            'select_all': function () {
                var ms = this.$element,
                    values = ms.val();

                ms.find('option:not(":disabled")').prop('selected', true);
                this.$selectableUl.find('.ms-elem-selectable').filter(':not(.' + this.options.disabledClass + ')').addClass('ms-selected').hide();
                this.$selectionUl.find('.ms-optgroup-label').show();
                this.$selectableUl.find('.ms-optgroup-label').hide();
                this.$selectionUl.find('.ms-elem-selection').filter(':not(.' + this.options.disabledClass + ')').addClass('ms-selected').show();
                this.$selectionUl.focus();
                ms.trigger('change');
                if (typeof this.options.afterSelect === 'function') {
                    var selectedValues = $.grep(ms.val(), function (item) {
                        return $.inArray(item, values) < 0;
                    });
                    this.options.afterSelect.call(this, selectedValues);
                }
            },

            'deselect_all': function () {
                var ms = this.$element,
                    values = ms.val();

                ms.find('option').prop('selected', false);
                this.$selectableUl.find('.ms-elem-selectable').removeClass('ms-selected').show();
                this.$selectionUl.find('.ms-optgroup-label').hide();
                this.$selectableUl.find('.ms-optgroup-label').show();
                this.$selectionUl.find('.ms-elem-selection').removeClass('ms-selected').hide();
                this.$selectableUl.focus();
                ms.trigger('change');
                if (typeof this.options.afterDeselect === 'function') {
                    this.options.afterDeselect.call(this, values);
                }
            },

            sanitize: function (value) {
                var hash = 0, i, character;
                if (value.length == 0) return hash;
                var ls = 0;
                for (i = 0, ls = value.length; i < ls; i++) {
                    character = value.charCodeAt(i);
                    hash = ((hash << 5) - hash) + character;
                    hash |= 0; // Convert to 32bit integer
                }
                return hash;
            }
        };

        /* MULTISELECT PLUGIN DEFINITION
         * ======================= */

        $.fn.multiSelect = function () {
            var option = arguments[0],
                args = arguments;

            return this.each(function () {
                var $this = $(this),
                    data = $this.data('multiselect'),
                    options = $.extend({}, $.fn.multiSelect.defaults, $this.data(), typeof option === 'object' && option);

                if (!data) {
                    $this.data('multiselect', (data = new MultiSelect(this, options)));
                }

                if (typeof option === 'string') {
                    data[option](args[1]);
                } else {
                    data.init();
                }
            });
        };

        $.fn.multiSelect.defaults = {
            keySelect: [32],
            selectableOptgroup: false,
            disabledClass: 'disabled',
            dblClick: false,
            keepOrder: false,
            cssClass: ''
        };

        $.fn.multiSelect.Constructor = MultiSelect;

        $.fn.insertAt = function (index, $parent) {
            return this.each(function () {
                if (index === 0) {
                    $parent.prepend(this);
                } else {
                    $parent.children().eq(index - 1).after(this);
                }
            });
        };

    }(window.jQuery);

    $('#pre-selected-options').multiSelect();



    $('.searchable').multiSelect({
        selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='try \"12\"'>",
        selectionHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='try \"4\"'>",
        afterInit: function(ms){
            var that = this,
                $selectableSearch = that.$selectableUl.prev(),
                $selectionSearch = that.$selectionUl.prev(),
                selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
                selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

            that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                .on('keydown', function(e){
                    if (e.which === 40){
                        that.$selectableUl.focus();
                        return false;
                    }
                });

            that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                .on('keydown', function(e){
                    if (e.which == 40){
                        that.$selectionUl.focus();
                        return false;
                    }
                });
        },
        afterSelect: function(){
            this.qs1.cache();
            this.qs2.cache();
        },
        afterDeselect: function(){
            this.qs1.cache();
            this.qs2.cache();
        }
    });

};


