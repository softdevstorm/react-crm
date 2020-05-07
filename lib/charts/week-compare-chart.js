import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});
import ChartOption from './chartoptions';

class WeekCompareChart extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);
        this.state = {
            compareMessages: props.compareMessages,
            series: [{
                    name: 'PRODUCT A',
                    data: [44, 55, 41, 67, 22, 43, 31]
                }, {
                    name: 'PRODUCT B',
                    data: [13, 23, 20, 8, 13, 27, 64]
                }, {
                    name: 'PRODUCT C',
                    data: [11, 17, 15, 15, 21, 14, 34]
                }, {
                    name: 'PRODUCT D',
                    data: [21, 7, 25, 13, 22, 8, 21]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    categories: ChartOption.week
                },
                yaxis: {
                    labels: {
                        formatter: function(val) {
                          return val.toFixed(0);
                        }
                    }
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
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
            }
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
        let newSeries = [];
        companyIds.forEach(function(companyId, index) {
            let series = {}
            let messages = compareData[companyId].messages;
            let label = compareData[companyId].company.name;
            let touchPoints = []
            ChartOption.week.forEach(function (day, dayIndex) {
                let touchPoint = 0;
                messages.forEach(function(message, messageIndex) {
                    var messageDay = new Date(message.received_on).getDay();
                    if (messageDay === dayIndex + 1) {
                        touchPoint += 1;
                    } else if (messageDay === 0 && dayIndex + 1 === 7) {
                        touchPoint += 1;
                    }
                })
                touchPoints.push(touchPoint);
            })
            series['name'] = label
            series['data'] = touchPoints
            newSeries.push(series);
        })
        
        this.setState({
            series: newSeries,
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    categories: ChartOption.week
                },
                yaxis: {
                    labels: {
                        formatter: function(val) {
                          return val.toFixed(0);
                        }
                    }
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
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
            }
        });
    }

    render() {
        return (
            <div id="week_compare_chart">
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

export default WeekCompareChart;