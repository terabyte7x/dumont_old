import React from 'react';
import ReactTooltip from 'react-tooltip';
import CalendarHeatmap from 'react-calendar-heatmap';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Loadfactor from 'react-google-charts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Indicators,
  ChartCalender,
  Chart,
  SessionCharts,
} from './styles';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import './heat.css';

const today = new Date();

function Flightdeck() {
  const randomValues = getRange(200).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });
  const receita = [
    {
      name: 'Jan',
      Caixa: 4000,
    },
    {
      name: 'Fev',
      Caixa: 3000,
    },
    {
      name: 'Mar',
      Caixa: -1000,
    },
    {
      name: 'Abr',
      Caixa: 500,
    },
    {
      name: 'Mai',
      Caixa: -2000,
    },
    {
      name: 'Jun',
      Caixa: -250,
    },
    {
      name: 'Jul',
      Caixa: 3490,
    },
  ];
  const gradientOffset = () => {
    const dataMax = Math.max(...receita.map(i => i.Caixa));
    const dataMin = Math.min(...receita.map(i => i.Caixa));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };
  const off = gradientOffset();
  const data = [
    {
      name: 'Janeiro',
      Aeronaves: 400,
      Motores: 240,
      Agendamentos: 240,
    },
    {
      name: 'Feveiro',
      Aeronaves: 300,
      Motores: 138,
      Agendamentos: 221,
    },
    {
      name: 'Março',
      Aeronaves: 200,
      Motores: 980,
      Agendamentos: 229,
    },
    {
      name: 'Abril',
      Aeronaves: 278,
      Motores: 390,
      Agendamentos: 200,
    },
    {
      name: 'Maio',
      Aeronaves: 189,
      Motores: 480,
      Agendamentos: 218,
    },
    {
      name: 'Junho',
      Aeronaves: 239,
      Motores: 380,
      Agendamentos: 250,
    },
    {
      name: 'Julho',
      Aeronaves: 349,
      Motores: 430,
      Agendamentos: 210,
    },
  ];
  return (
    <Container>
      <Indicators>
        <ul>
          <li>
            <p>R$357,90</p>
            <span>Breaking-even point</span>
          </li>
        </ul>

        <ul>
          <li>
            <p>650</p>
            <span>Horas voadas</span>
          </li>
        </ul>

        <ul>
          <li>
            <p>3.750</p>
            <span>Horas disponíveis</span>
          </li>
        </ul>

        <ul>
          <li>
            <p>07:15</p>
            <span>UTC</span>
          </li>
        </ul>
      </Indicators>
      <ChartCalender>
        <>
          <CalendarHeatmap
            monthLabels={[
              'Jan',
              'Fev',
              'Mar',
              'Abr',
              'Mai',
              'Jun',
              'Jul',
              'Ago',
              'Set',
              'Out',
              'Nov',
              'Dez',
            ]}
            weekdayLabels={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
            // startDate={shiftDate(today, -170)}
            // endDate={today}
            values={randomValues}
            classForValue={value => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
            tooltipDataAttrs={value => {
              return {
                'data-tip': `${value.date
                  .toISOString()
                  .slice(0, 10)} has count: ${value.count}`,
              };
            }}
            showWeekdayLabels
            onClick={value =>
              alert(`Clicked on value with count: ${value.count}`)
            }
          />
        </>
        <ReactTooltip />
        {/* <Loadfactor
          chartType="Calendar"
          loader={<div>Taxiando</div>}
          data={[
            [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
            [new Date(2020, 1, 4), 38],
            [new Date(2020, 1, 5), 10],
            [new Date(2020, 1, 12), 21],
            [new Date(2020, 1, 13), 29],
            [new Date(2020, 1, 19), 23],
            [new Date(2020, 1, 23), 45],
            [new Date(2020, 1, 24), 36],
            [new Date(2020, 2, 10), 47],
          ]}
          options={{
            daysOfWeek: 'DLMMJVS',
          }}
          rootProps={{ 'data-testid': '1' }}
        /> */}
      </ChartCalender>
      <SessionCharts>
        <Chart>
          <p>Células, Motores e Agendamentos</p>
          <AreaChart
            width={450}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="Aeronaves"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="Motores"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="Agendamentos"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </Chart>
        <Chart>
          <p>Receita</p>
          <AreaChart
            width={450}
            height={300}
            data={receita}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#82ca9d" stopOpacity={1} />
                <stop offset={off} stopColor="#F7685B" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="Caixa"
              stroke="#000"
              fill="url(#splitColor)"
            />
          </AreaChart>
        </Chart>
      </SessionCharts>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount),
  })),
  // Reduce é usado para reduzir todos os elementos de um Array a um único elemento.
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flightdeck);
