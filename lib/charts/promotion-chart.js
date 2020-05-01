import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});
import ChartOption from './chartoptions';

class PromotionChart extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);
        this.state = {
            messages: props.messages,
            series: [0 ,0],
            options: {
                title: {
                    text: 'PROMOTION',
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
                    type: 'donut',
                },
                labels: ChartOption.promotions,
                dataLabels: {
                    enabled: true
                },
                legend: {
                    show: false,
                    width: 80,
                    formatter: function(value) {
                        return value;
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
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
        ChartOption.promotions.forEach(promotion => {
            let promotionCount = 0;
            messages.forEach(message => {
                var messagePromotion = message.special1
                if (promotion === 'Yes') {
                    if (messagePromotion) promotionCount += 1;
                } else {
                    if (!messagePromotion) promotionCount += 1;
                }
            })
            newSeries.push(promotionCount)
        })

        this.setState({
            series: newSeries,
        });
    }

    render() {
        return (
            <div id="promotion_chart">
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

export default PromotionChart;