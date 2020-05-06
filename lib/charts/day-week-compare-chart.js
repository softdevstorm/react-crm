import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});
import ChartOption from './chartoptions';

class DayWeekCompareChart extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);

        this.state = {
            compareMessages: props.compareMessages,
            series: [{
                    name: 'Marine Sprite',
                    data: [44, 55, 41, 37, 22, 43, 21]
                }, {
                    name: 'Striking Calf',
                    data: [53, 32, 33, 52, 13, 43, 32]
                }, {
                    name: 'Tank Picture',
                    data: [12, 17, 11, 9, 15, 11, 20]
                }, {
                    name: 'Bucket Slope',
                    data: [9, 7, 5, 8, 6, 9, 4]
                }, {
                    name: 'Reborn Kid',
                    data: [25, 12, 19, 32, 25, 24, 10]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    stackType: '100%'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: 'DAYS OF THE WEEK',
                    align: 'center',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize:  '14px',
                        fontWeight:  'bold',
                        fontFamily:  undefined,
                        color:  '#263238'
                    },
                },
                colors: ChartOption.colors,
                xaxis: {
                    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                        return val + "Touchpoints"
                        }
                    }
                },
                fill: {
                    opacity: 1
                
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.updateCharts(this.props.compareMessages, this.props.companyIds);
        }
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevprops.compareMessages != this.props.compareMessages) {
            this.setState(this.updateCharts(this.props.compareMessages, this.props.companyIds));
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateCharts(compareData, companyIds) {
        let xCategories = [];
        var newSeries = [];
        var categories = []
        ChartOption.week.forEach(function (day, index) {
            let series = {}
            let tempCategories = [];
            let dataPoints = [];
            for (var id=0; id<companyIds.length; id++) {
                let cid = companyIds[id];
                let messages = compareData[cid].messages;
                let label = compareData[cid].company.name;
                tempCategories.push(label)
                let dataPoint = 0;
                messages.forEach(function(message, message_id) {
                    var messageDay = new Date(message.received_on).getDay();
                    if (messageDay === index + 1) {
                        dataPoint += 1;
                    } else if (messageDay === 0 && index + 1 === 7) {
                        dataPoint += 1;
                    }
                    if (message.categories.length > 0) {
                        var category = message.categories[0];
                        if (categories.includes(category) === false) {
                            categories.push(category)
                        }
                    }
                })
                dataPoints.push(dataPoint);
            }
            series['name'] = day
            series['data'] = dataPoints
            newSeries.push(series);
            xCategories = tempCategories
        })

        this.setState({
            series: newSeries,
            options: {
                chart: {
                    type: 'bar',
                    height: 250,
                    stacked: true,
                    stackType: '100%'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: 'DAYS OF THE WEEK',
                    align: 'center',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize:  '14px',
                        fontWeight:  'bold',
                        fontFamily:  undefined,
                        color:  '#263238'
                    },
                },
                colors: ChartOption.colors,
                xaxis: {
                    categories: xCategories,
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                        return val + "Touchpoints"
                        }
                    }
                },
                fill: {
                    opacity: 1
                
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
        })
    }

    render() {
        return (
            <div id="day_week_compare_chart">
                <ReactApexChart 
                    options={this.state.options} 
                    series={this.state.series} 
                    type={this.state.options.chart.type}
                    height={250}
                />
            </div>
        );
    }
}

export default DayWeekCompareChart;