export enum SSL_PROXYING {
  ENABLE_ALL = "SSL_PROXYING:ENABLE_ALL",
  DISABLE_ALL = "SSL_PROXYING:DISABLE_ALL",

  UPSERT_INCLUSION_LIST_SOURCE = "SSL_PROXYING:UPSERT_INCLUSION_LIST_SOURCE",
  DELETE_INCLUSION_LIST_SOURCE = "SSL_PROXYING:DELETE_INCLUSION_LIST_SOURCE",
  UPDATE_INCLUSION_LIST = "SSL_PROXYING:UPDATE_INCLUSION_LIST",
  CLEAR_INCLUSION_LIST = "SSL_PROXYING:CLEAR_INCLUSION_LIST",

  UPSERT_EXCLUSION_LIST_SOURCE = "SSL_PROXYING:UPSERT_EXCLUSION_LIST_SOURCE",
  DELETE_EXCLUSION_LIST_SOURCE = "SSL_PROXYING:DELETE_EXCLUSION_LIST_SOURCE",
  UPDATE_EXCLUSION_LIST = "SSL_PROXYING:UPDATE_EXCLUSION_LIST",
  CLEAR_EXCLUSION_LIST = "SSL_PROXYING:CLEAR_EXCLUSION_LIST",

  GET_ALL = "SSL_PROXYING:GET_ALL",
  GET_INCLUSION_LIST = "SSL_PROXYING:GET_INCLUSION_LIST",
  GET_EXCLUSION_LIST = "SSL_PROXYING:GET_EXCLUSION_LIST",
}

export enum USER_PREFERENCE {
  UPDATE_DEFAULT_PORT = "USER_PREFERENCE:UPDATE_DEFAULT_PORT",

  GET_ALL = "USER_PREFERENCE:GET_ALL",
  GET_DEFAULT_PORT = "USER_PREFERENCE:GET_DEFAULT_PORT",
}

const ACTION_TYPES = {
  SSL_PROXYING,
  USER_PREFERENCE
};

export default ACTION_TYPES;
