// @ts-nocheck
var vueTable = function () {
    var tableApp;
    var obj = {
        init: function (config) {
            // 注册



            //vue对象模板
            var vueObject = {
                el: config.el,
                prop: ['msg'],
                data: {
                    msg: '123asd',
                    rows: config.rows,
                    fields: []
                },
                methods: {
                    render: function () {
                        var _this = this;

                        $.getJSON(config.url, function (res) {
                            _this.fields = [];
                            _this.fields = res;


                        });

                    }
                }
            };

            //需要传基础字段
            //创建基础结构
            var $table = $(config.el);
            var $thead = $('<thead/>');
            var $tbody = $('<tbody/>');
            $table.append($thead).append($tbody);

            $table.addClass('table');
            $table.addClass('table-bordered table-hover');

            //创建表头v-for
            var $tr_$th = $('<tr/>');
            $tr_$th.html('<th v-for="(item,index) in rows">{{item.title}}</th>');
            $thead.html($tr_$th);

            var $tr_$td = $('<tr v-for="(field,i) in fields"></tr>');
            $tr_$td.html('<td v-for="(value,key) in rows">{{field[value.field]}}<comp></comp></td>');
            $tbody.html($tr_$td);

            tableApp = new Vue(vueObject);



            return tableApp;
        },
        on: function (event, f) {
            obj.eventList[event] = f;
        },
        eventList: {},

    }

    return obj;



}();
