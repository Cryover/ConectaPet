import {CommonActions} from '@react-navigation/native';

let _navigator: {dispatch: (arg0: CommonActions.Action) => void};

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: any, params?: any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

export default {
  setTopLevelNavigator,
  navigate,
};
