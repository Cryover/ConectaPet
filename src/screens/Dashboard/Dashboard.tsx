/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-paper';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import {useLoading} from '../../contexts/loadingContext';
import axiosInstance from '../../utils/axiosIstance';
import {useAuthContext} from '../../contexts/authContext';

const dataLineChartPre = {
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

const dataBarChartPre = {
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

const dataPieChartPre = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#068110',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

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

const pieChartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const Dashboard = () => {
  const {startLoading, stopLoading, isLoading} = useLoading();
  const {user, userToken, setUserToken} = useAuthContext();
  const [dataLineChart, setDataLineChart] = useState();
  const [dataBarChart, setDataBarChart] = useState();
  const [dataPieChart, setDataPieChart] = useState();

  const getGraphData = async () => {
    try {
      startLoading();

      if (user) {
        const response = await axiosInstance.get(`/pets?id=${user.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.status === 200) {
        } else if (response.status === 401) {
          setUserToken(null);
        }
      } else {
      }
    } catch (err) {
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    //getGraphData();
  }, []);

  return (
    <View style={styles.container}>
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
              data={dataLineChartPre}
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
        </Card>
        <Card>
          <Card.Title title="Despesa por Pet" titleVariant="headlineSmall" />
          <Card.Content>
            <BarChart
              data={dataBarChartPre}
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
        </Card>
      </ScrollView>
      {isLoading ? <LoadingOverlay /> : <Text children={undefined} />}
      <Text style={{color: 'red', textAlign: 'center'}}>{}</Text>
    </View>
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
