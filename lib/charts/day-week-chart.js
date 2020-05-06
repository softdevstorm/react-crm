import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});
import ChartOption from './chartoptions';

class DayWeekChart extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);
        this.state = {
            messages: props.messages,
            compareMessages: props.compareMessages,
            series: ChartOption.initData,
            options: {
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
                chart: {
                    width: 380,
                    height: 250,
                    type: 'pie',
                },
                labels: ChartOption.week,
                legend: {
                    show: false,
                    width: 100,
                },
                tooltip: {
                    x: {
                        show: true
                    },
                    y: {
                        formatter: function(value) {
                            if (value > 1) {
                                return value + ' TouchPoints';
                            } else {
                                return value + ' TouchPoint';
                            }
                      }
                    }
                }
            },
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.updateCharts(this.state.messages);
        }
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevprops.messages != this.props.messages) {
            this.setState(this.updateCharts(this.props.messages));
        }
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

    updateCharts(messages) {
        const newSeries = [];
        ChartOption.week.forEach(function (day, index) {
            let touchPointsCount = 0;
            messages.forEach(message => {
                let weekDay = new Date(message.received_on).getDay();
                if (weekDay === index + 1) {
                    touchPointsCount += 1;
                } else if (weekDay === 0 && index + 1 === 7) {
                    touchPointsCount += 1;
                }
            })  
            newSeries.push(touchPointsCount)
        })
        
        this.setState({
            series: newSeries,
            options: {
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
                chart: {
                    width: 380,
                    height: 250,
                    type: 'pie',
                },
                labels: ChartOption.week,
                legend: {
                    show: false,
                    width: 100,
                },
                tooltip: {
                    x: {
                        show: true
                    },
                    y: {
                        formatter: function(value) {
                            if (value > 1) {
                                return value + ' TouchPoints';
                            } else {
                                return value + ' TouchPoint';
                            }
                        }
                    }
                }
            }
        });
    }

    render() {
        return (
            <div id="day_week_chart">
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

export default DayWeekChart;