var vueTable = function () {
    var demoTable;
    var obj = {
        init: function (config) {

            //创建vue对象
            var vueObject = {
                el: config.el,
                data: {
                    rows: {}
                },
                methods: {
                    render: function () {
                        var _this = this;

                        $.getJSON(config.url, function (res) {
                            _this.rows = res;


                        });

                    }
                }
            };

            //需要传基础字段
            //创建基础结构
            var table = $(config.el);
            var thead = $('<thead/>');
            var tbody = $('<tbody/>');

            table.addClass('table');
            table.addClass('table-bordered table-hover');

            var tr = $('<tr/>');

            //生成表头
            for (var i = 0; i < config.rows.length; i++) {
                var row = config.rows[i];
                var td = $('<td/>');
                td.text(row.field);
                tr.append(td);
            }
            thead.append(tr);

            var tr = $('<tr/>');
            tr.attr('v-for', '(item,index) in rows');
            tr.attr('key', 'item.id');

            //生成身体
            for (var i = 0; i < config.rows.length; i++) {

                var row = config.rows[i];
                var td = $('<td/>');
                td.text('{{item.' + row.field + '}}');
                //事件添加
                if (row.click != null) {


                    td.attr('v-on:click', row.click + '(index)');
                    var event = row.click;

                    vueObject.methods[event] = function (index) {
                        //这里的this其实是vue的js

                        var o = {
                            app: this,
                            rows: this.rows[index],
                            col: this.rows[index].name,
                        }

                        obj.eventList[event](o);

                    }

                }

                tr.append(td);
            }


            tbody.append(tr);



            table.append(thead);
            table.append(tbody);
            // $(config.el).append(table);

            demoTable = new Vue(vueObject);
            demoTable.render();

            return demoTable;
        },
        on: function (event, f) {
            obj.eventList[event] = f;
        },
        eventList: {},

    }

    return obj;



}();