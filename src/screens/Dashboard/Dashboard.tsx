import * as React from 'react';
import {Card} from 'react-native-paper';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Dashboard = () => {
  const dataLineChart = {
    labels: [
      'Jan.',
      'Fev.',
      'Mar.',
      'Abr.',
      'Mai.',
      'Jun.',
      'jul.',
      'Agos.',
      'Set.',
      'Out.',
      'Nov.',
      'Dez.',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 20, 20, 20, 70, 80],
        color: (opacity = 1) => `rgba(93, 107, 176, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Despesas por mês'], // optional
  };

  const dataBarChart = {
    labels: ['Mel', 'Manu', 'Spike', 'Tupa', 'Mika', 'Toia'],
    datasets: [
      {
        data: [20, 140, 30, 300, 1000, 500],
        //color: (opacity = 1) => `rgba(93, 107, 176, ${opacity})`, // optional
        //strokeWidth: 3, // optional
      },
    ],
    //legend: ['Despesas Totais por mes'], // optional
  };

  const lineChartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };

  const barChartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    barRadius: 2,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Title
            title="Despesas Totais"
            titleVariant="headlineSmall"
            //subtitle="Card Subtitle"
            //left={LeftContent}
          />
          <Card.Content>
            <LineChart
              data={dataLineChart}
              width={screenWidth - 10}
              height={220}
              yAxisLabel="R$"
              yAxisSuffix=""
              chartConfig={lineChartConfig}
              style={{
                marginLeft: -15,
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Card.Content>
          {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
        </Card>
        <Card>
          <Card.Title title="Despesa por Pet" titleVariant="headlineSmall" />
          <Card.Content>
            <BarChart
              data={dataBarChart}
              width={screenWidth - 20}
              height={220}
              yAxisLabel="R$"
              yAxisSuffix=""
              chartConfig={barChartConfig}
              verticalLabelRotation={30}
              style={{
                marginLeft: 5,
                marginVertical: 8,
              }}
            />
          </Card.Content>
          {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  centerView: {
    //margin: 'auto',
    backgroundColor: '#ffffff',
  },
  input: {
    //height: 40,
    width: 300,
  },
  button: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  links: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
  },
});
