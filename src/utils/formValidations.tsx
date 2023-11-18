export const emailRegex = {
  regex: new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ),
  errorMessage: 'username inválido',
};

export const telephoneRegex = {
  regex: new RegExp(/^\d+$/),
  errorMessage: 'Número de telefone inválido',
};
