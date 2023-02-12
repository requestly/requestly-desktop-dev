import * as path from "path";
/** CONFIG */
import { staticConfig } from "../../../config";

const PATH_VAR_SEPARATOR = process.platform === "win32" ? ";" : ":";

export const OVERRIDES_DIR = path.join(
  staticConfig.STATIC_FILES_DIR,
  "overrides"
);

const OVERRIDE_RUBYGEMS_PATH = path.join(OVERRIDES_DIR, "gems");
const OVERRIDE_PYTHONPATH = path.join(OVERRIDES_DIR, "pythonpath");

export const OVERRIDE_JAVA_AGENT = path.join(OVERRIDES_DIR, "java-agent.jar");

const OVERRIDE_JS_SCRIPT = path.join(OVERRIDES_DIR, "js", "prepend-node.js");

const NODE_OPTION = `--require ${
  // Avoid quoting except when necessary, because node 8 doesn't support quotes here
  OVERRIDE_JS_SCRIPT.includes(" ")
    ? `"${OVERRIDE_JS_SCRIPT}"`
    : OVERRIDE_JS_SCRIPT
}`;

export const OVERRIDE_BIN_PATH = path.join(OVERRIDES_DIR, "path");

export function getTerminalEnvVars(proxyPort, httpsConfig, currentEnv) {
  const proxyUrl = `http://${staticConfig.PROXY_HOST}:${proxyPort}`;
  const javaAgentOption = `-javaagent:${OVERRIDE_JAVA_AGENT}=${staticConfig.PROXY_HOST}|${proxyPort}|${httpsConfig.certPath}`;

  return {
    http_proxy: proxyUrl,
    HTTP_PROXY: proxyUrl,
    https_proxy: proxyUrl,
    HTTPS_PROXY: proxyUrl,
    // Used by global-agent to configure node.js HTTP(S) defaults
    GLOBAL_AGENT_HTTP_PROXY: proxyUrl,
    // Used by some CGI engines to avoid 'httpoxy' vulnerability
    CGI_HTTP_PROXY: proxyUrl,
    // Used by npm, for versions that don't support HTTP_PROXY etc
    npm_config_proxy: proxyUrl,
    npm_config_https_proxy: proxyUrl,
    // Stop npm warning about having a different 'node' in $PATH
    npm_config_scripts_prepend_node_path: "false",
    // Proxy used by the Go CLI
    GOPROXY: proxyUrl,
    // Trust cert when using OpenSSL with default settings
    SSL_CERT_FILE: httpsConfig.certPath,
    // Trust cert when using Node 7.3.0+
    NODE_EXTRA_CA_CERTS: httpsConfig.certPath,
    // Trust cert when using Requests (Python)
    REQUESTS_CA_BUNDLE: httpsConfig.certPath,
    // Trust cert when using Perl LWP
    PERL_LWP_SSL_CA_FILE: httpsConfig.certPath,
    // Trust cert for HTTPS requests from Git
    GIT_SSL_CAINFO: httpsConfig.certPath,
    // Trust cert in Rust's Cargo:
    CARGO_HTTP_CAINFO: httpsConfig.certPath,
    // Flag used by subprocesses to check they're running in an intercepted env
    REQUESTLY_ACTIVE: "true",
    // Prepend our bin overrides into $PATH
    PATH: `${OVERRIDE_BIN_PATH}${PATH_VAR_SEPARATOR}${
      currentEnv == "runtime-inherit" ? "$PATH" : currentEnv.PATH
    }`,
    // Prepend our Ruby gem overrides into $LOAD_PATH
    RUBYLIB:
      currentEnv === "runtime-inherit"
        ? `${OVERRIDE_RUBYGEMS_PATH}:$RUBYLIB`
        : !!currentEnv.RUBYLIB
        ? `${OVERRIDE_RUBYGEMS_PATH}:${currentEnv.RUBYLIB}`
        : OVERRIDE_RUBYGEMS_PATH,
    // Prepend our Python package overrides into $PYTHONPATH
    PYTHONPATH:
      currentEnv === "runtime-inherit"
        ? `${OVERRIDE_PYTHONPATH}:$PYTHONPATH`
        : currentEnv.PYTHONPATH
        ? `${OVERRIDE_PYTHONPATH}:${currentEnv.PYTHONPATH}`
        : OVERRIDE_PYTHONPATH,
    // We use $NODE_OPTIONS to prepend our script into node. Notably this drops existing
    // env values, when using our env, because _our_ NODE_OPTIONS aren't meant for
    // subprocesses. Otherwise e.g. --max-http-header-size breaks old Node/Electron.
    NODE_OPTIONS:
      currentEnv === "runtime-inherit"
        ? `$NODE_OPTIONS ${NODE_OPTION}`
        : NODE_OPTION,
    // Attach our Java agent to all launched Java processes:
    JAVA_TOOL_OPTIONS:
      currentEnv === "runtime-inherit"
        ? `$JAVA_TOOL_OPTIONS ${javaAgentOption}`
        : currentEnv.JAVA_TOOL_OPTIONS
        ? `${currentEnv.JAVA_TOOL_OPTIONS} ${javaAgentOption}`
        : javaAgentOption,
  };
}
