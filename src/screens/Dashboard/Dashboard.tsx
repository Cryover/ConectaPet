/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Card, Divider, FAB} from 'react-native-paper';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import {useLoading} from '../../contexts/loadingContext';
import axiosInstance from '../../utils/axiosIstance';
import {useAuthContext} from '../../contexts/authContext';
import {DashboardScreenNavigationProp, Despesa} from '../../types/types';
import {useToast} from '../../contexts/toastContext';
import Toast from 'react-native-toast-message';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes';
import {LineChartDataClass} from '../../types/classes';

const dataLineChartPre: LineChartData = {
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
      data: [10, 25, 28, 50, 59, 43, 20, 20, 20, 20, 70, 80],
      color: (opacity = 1) => `rgba(93, 107, 176, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  //legend: ['Despesas por mês'], // optional
};

const dataBarChartPre: ChartData = {
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

const lineChartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
};

const barChartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  barRadius: 2,
};

const DashboardScreen: React.FC<{
  navigation: DashboardScreenNavigationProp;
}> = ({navigation}) => {
  const {user, userToken, setUserToken} = useAuthContext();
  const {startLoading, stopLoading, isLoading} = useLoading();
  const {showToast} = useToast();
  const [dataLineChart, setDataLineChart] =
    useState<LineChartData>(dataLineChartPre);
  const [dataBarChart, setDataBarChart] = useState(dataBarChartPre);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleSetLineChartGraphs = (despesaData: Despesa[]) => {
    const newLineChart: LineChartDataClass[] = [];
    const labelsDataSets: string[] = [];
    const dataDataSet: Dataset[] = [];
    const arrayNumber: number[] = [];

    /* despesaData.forEach(element => {
      labelsDataSets.push(element.nome);
      arrayNumber.push(element.id_pet);

    }); */

    /* despesaData.forEach(element => {
      dataSet.data.push(element.valor);
    });

    arrayNewDataSets.push(dataSet);

    setDataLineChart({
      labels: newLineChart.labels,
      datasets: newLineChart.datasets,
    });
    setDataBarChart({
      labels: newLineChart.labels,
      datasets: newLineChart.datasets,
    }); */
  };

  const getGraphDataByMonth = async () => {
    try {
      startLoading();

      const response = await axiosInstance.get(`/despesa/byowner/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        showToast('success', 'Registros encontrados');
        handleSetLineChartGraphs(response.data);
      } else if (response.status === 401) {
        showToast('error', 'Token Expirado, favor fazer login novamente');
        setUserToken(null);
        navigation.navigate('Login');
      } else if (response.status === 404) {
        showToast('error', 'Nenhum registro encontrado');
      }
    } catch (err) {
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  const getGraphDataByPetMonth = async () => {
    try {
      startLoading();

      const response = await axiosInstance.get(`/despesa/byowner/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        showToast('success', 'Registros encontrados');
        //handleSetDatasGraphs(response.data);
      } else if (response.status === 401) {
        showToast('error', 'Token Expirado, favor fazer login novamente');
        setUserToken(null);
        navigation.navigate('Login');
      } else if (response.status === 404) {
        showToast('error', 'Nenhum registro encontrado');
      }
    } catch (err) {
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  const onRefresh = React.useCallback(() => {
    getGraphDataByMonth();
  }, []);

  useEffect(() => {
    getGraphDataByMonth();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Card>
          <Card.Title
            title="Despesas Total por Mês"
            titleVariant="titleMedium"
            titleStyle={{flex: 1, alignSelf: 'center'}}
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
        </Card>
        <Divider />
        <Card>
          <Card.Title
            title="Despesa de cada Pet por Mês"
            titleVariant="titleMedium"
            titleStyle={{flex: 1, alignSelf: 'center'}}
          />
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
                paddingLeft: 5,
                marginLeft: 5,
                marginVertical: 8,
              }}
            />
          </Card.Content>
        </Card>
      </ScrollView>
      {isLoading ? <LoadingOverlay /> : <Text children={undefined} />}
      <Text style={{color: 'red', textAlign: 'center'}}>{}</Text>
      <Toast />
    </View>
  );
};

export default DashboardScreen;

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
  title: {
    fontSize: 22,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    textColor: 'white',
    backgroundColor: '#5D6BB0',
  },
});
