//本月遊客趋势
let tourist_form = echarts.init(document.querySelector('.tourist_form'));
let options ={
    title: {
        text: '旅游人数',
        x: 'left',
        textStyle: {
            fontSize: 16,
            color: '#fff',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type:'none'
        },
        backgroundColor:'rgba(27,45,61,.8)',
        textStyle:{
            color:'fff',
            fontSize:12
        },
        // formatter:"<div><p>"+"{b}[0]"+"{b}"[1]+"月"+"{b}"[2]+"{b}"[3]+"日"+"</p></div>"
        formatter(params){
            console.log(params)
            let data = params[0].data;
            let date = data.name.split("/");
            let count = data.value;
            return `<div>
                    <p>${date[0]}月${date[1]}日</p>
                    <p>旅游人数:${count}万人</p>
                </div>`
        }
    },
    legend: {
        show: false
    },
    grid: {
        left: '4%',
        right: '5%',
        top: '25%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        // interval: 2,
        axisLine: {
            lineStyle: {
                color: 'rgba(82, 191, 255, 0.3)',
            }
        },
        data: ["10/21","10/22","10/23","10/24","10/25","10/26","10/27","10/28"],
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color:'#bbb'
            }
        },
    }],
    yAxis: [{
        type: 'value',
        name: '万人',
        nameLocation: 'end',
        nameRotate: 0,
        nameGap: 5,
        nameTextStyle: {
            color: '#bbb',
            padding: [0, 0, 0, 50]
        },
        axisTick: {
            show: true
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(82, 191, 255, 0.3)',
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color: '#bbb',
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(82, 191, 255, 0.3)',
                type: 'dashed'
            }
        },
    }],
    series: [{
        name: '旅游人数',
        type: 'line',
        smooth: true,
        symbol:"circle",
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(11, 255, 251, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(11, 255, 251, 0.7)'
                    }]
                },
            }
        },
        symbolSize: 4,
        itemStyle: {
            normal: {
                color: 'rgba(11, 255, 251,1)',
                borderColor: 'rgba(11, 255, 251, 1)'
            },
        },
        data: [
            {"name":"10/21","value":43},
            {"name":"10/22","value":35},
            {"name":"10/23","value":44},
            {"name":"10/24","value":42},
            {"name":"10/25","value":45},
            {"name":"10/26","value":70},
            {"name":"10/27","value":73},
            {"name":"10/28","value":55},
        ]
        ,
    }]
}
tourist_form.setOption(options);


//游客来源分析
let source_form = echarts.init(document.querySelector('.source_form'));
let options_source_form = {
    title: {
        // text: '游客来源分布图',
        // subtext: `10月游客数: 100人`,
        subtextStyle: {
            color: "#0bfffb",
            fontSize: 14
        },
        x: 'left',
        textStyle: {
            fontSize: 16,
            color: '#fff',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c}万 ({d}%)",
        backgroundColor:'rgba(27,45,61,.8)',
        textStyle:{
            color:'fff',
            fontSize:12
        }
    },
    legend: {
        show: false
    },
    color: ['rgb(11,255,251)', 'rgb(212,63,57)', 'rgb(247,221,5)', 'rgb(0,186,1)', 'rgb(0,70,255)'],
    series: [
        {
            name: "游客来源",
            type: "pie",
            center: ['50%', "65%"],
            radius: ['30%', "50%"],
            avoidLabelOverlap: false,
            // startAngle: 300,
            minAngle: 20,
            label: {
                normal: {
                    formatter: '{b} {c}%',
                    position: 'outside',
                    verticalAlign: 'middle',
                    align: 'center',
                    fontSize: 14,
                    color: 'RGB(139,162,181)'
                }
            },
            labelLine: {
                length: 8,
                length2: 5,
            },
            data: addColorStyleToItem(
                ['RGB(182,117,33)', 'RGB(108,214,217)', 'RGB(2,52,194)', 'RGB(155,47,43)','RGB(155,47,43)'],
                [{"value":15,"name":"入境"}, {"value":40,"name":"省内外市"},{"value":15,"name":"本地"},{"value":35,"name":"省外"}])
        },
    ]
};
source_form.setOption(options_source_form);
function addColorStyleToItem(colors, objArry) {
    let newArry = []
    let regx = new RegExp(/(rgb)/ig);
    objArry.forEach((item, index) => {
        let starColor = (colors[index % (colors.length - 1)]).replace(regx, '$1a');
        let endColor = (colors[index % (colors.length - 1)]).replace(regx, '$1a');
        starColor = starColor.substring(0, starColor.length - 1) + ',.4)';
        endColor = endColor.substring(0, endColor.length - 1) + ',.8)';
        console.log(endColor);
        newArry.push({
            ...item,
            itemStyle: {
                "color": {
                    "type": "radial",
                    "x": 0.5,
                    "y": 0.5,
                    "r": 1,
                    "colorStops": [
                        {
                            "offset": 0.1,
                            "color": starColor
                        },
                        {
                            "offset": 1,
                            "color": endColor
                        }
                    ]
                },
                "borderColor": colors[index % (colors.length - 1)]
            }
        })
    })
    return newArry
}

//景区预警
let preWarning_form = echarts.init(document.querySelector('.preWarning_form'));
let data = [
    { "name": "随意丢弃垃圾", "value": 10 },
    { "name": "触碰文物", "value": 20 },
    { "name": "随手刻画", "value": 5 },
    { "name": "进入未开放区域", "value": 15 }
];
const names = [];
const values = [];
for (let item of data) {
    names.push(item.name);
    values.push(item.value);
}
options_preWarning_form = {
    color: ["#3398DB"],
    tooltip: {
        formatter: (params, ticket, callback) => {
            return (
                params[0].name +
                '</br><span style="background-color:rgb(11,255,251);width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
                params[0].value.toLocaleString() +
                ("%" || "")
            );
        },
        backgroundColor: "rgba(27,45,61,0.8)",
        textStyle: {
            fontSize: 12,
            color: "#fff"
        },
        padding: 10,
        trigger: "axis",
        axisPointer: {
            type: ""
        }
    },
    grid: {
        left: "20",
        right: "20",
        top: "50",
        bottom: "20",
        containLabel: true
    },
    yAxis: [
        {
            type: "category",
            data: names,
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: "rbga(1,166,164,0)"
                }
            },
            axisLabel: {
                rotate: 0,
                margin: 10,
                align: "right",
                textStyle: {
                    color: "#bbbbbb"
                }
            }
        }
    ],
    xAxis: [
        {
            type: "value",
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: "#fff"
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "RGB(3,52,59)"
                }
            }
        }
    ],
    series: [
        {
            name: "" || "",
            type: "bar",
            animationDurationUpdate: 1000,
            barWidth: "40%",
            data: values,
            itemStyle: {
                normal: {
                    borderColor: "RGB(11,255,251)",
                    barBorderRadius: 10,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: "RGBA(11,255,251,0.7)" },
                        { offset: 1, color: "RGBA(11,255,251,0.3)" }
                    ])
                },
                emphasis: {
                    borderColor: "RGB(212,63,57)",
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    ShadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: "RGBA(212,63,57,0.7)" },
                        { offset: 1, color: "RGBA(212,63,57,0.3)" }
                    ])
                }
            }
        }
    ]
};
preWarning_form.setOption(options_preWarning_form);