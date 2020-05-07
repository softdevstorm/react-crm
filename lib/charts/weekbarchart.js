import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});
import ChartOption from './chartoptions';

class WeekChart extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);
        this.state = {
            messages: props.messages,
            series: [{
                name: 'TouchPoints',
                data: ChartOption.initData
            }],
            options: {
                chart: {
                    height: 300,
                    type: 'bar',
                },
                title: {
                    text: 'Direct Marketing',
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
                plotOptions: {
                    bar: {
                        columnWidth: '50%',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    row: {
                        colors: ['#fff', '#f2f2f2']
                    }
                },
                xaxis: {
                    labels: {
                        rotate: -45
                    },
                    categories: ChartOption.week,
                    // tickPlacement: 'on'
                },
                yaxis: {
                    labels: {
                        formatter: function(val) {
                          return val.toFixed(0);
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (y) {
                            return y;
                        }
                    },
                    followCursor: true,
                },
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

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateCharts(messages) {
        const newData = [];
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
            newData.push(touchPointsCount)
        })

        const newSeries = [{
            name: 'TouchPoints',
            data: newData
        }]

        this.setState({
            series: newSeries,
        });
    }

    render() {
        return (
            <div id="weekchart" >
                <ReactApexChart 
                    options = { this.state.options }
                    series = { this.state.series }
                    type = "bar"
                    height = { 300 }
                /> 
            </div>
        );
    }
}

export default WeekChart;