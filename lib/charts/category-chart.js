import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});
import ChartOption from './chartoptions';

class CategoryChart extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);
        this.state = {
            messages: props.messages,
            series: ChartOption.initData,
            options: {
                colors: ChartOption.colors,
                chart: {
                    width: 380,
                    height: 250,
                    type: 'pie',
                },
                labels: ChartOption.week,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'center',
                            labels: {
                                colors: ChartOption.colors,
                                useSeriesColors: true
                            }
                        }
                    }
                }],
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

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateCharts(messages) {
        const newSeries = [];
        const categories = [];
        messages.forEach(message => {
            let dataCategories = message.categories;
            dataCategories.forEach(category => {
                if (!categories.includes(category)) {
                    categories.push(category);
                }
            })
        })

        categories.forEach(category => {
            let categoryCount = 0;
            messages.forEach(message => {
                let dataCategories = message.categories;
                if (dataCategories.includes(category)) {
                    categoryCount += 1;
                }
            })  
            newSeries.push(categoryCount)
        })

        this.setState({
            series: newSeries,
            options: {
                title: {
                    text: 'PRODUCT CATEGORY',
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
                labels: categories,
                // responsive: [{
                //     breakpoint: 480,
                //     options: {
                //         chart: {
                //             width: 200
                //         },
                //         legend: {
                //             position: 'center',
                //             labels: {
                //                 colors: ChartOption.colors,
                //                 useSeriesColors: true
                //             },
                //             width: 50,
                //         }
                //     }
                // }],
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
        });
    }

    render() {
        return (
            <div id="category_chart">
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

export default CategoryChart;