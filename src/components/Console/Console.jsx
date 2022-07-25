import React, { Component } from "react"
import GraphiQL from "graphiql"
import GraphiQLExplorer from "graphiql-explorer"
import { buildClientSchema, getIntrospectionQuery } from "graphql"
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import { DEFAULT_QUERY, GRAPH_QL_URL, GRAPH_QL_SUBSCRIPTION_URL } from '../../constants/constants';
import {
    makeDefaultArg,
    getDefaultScalarArgValue,
} from "../../services/CustomArgs"

import "graphiql/graphiql.css"
import "./Console.css"

const fetcher = createGraphiQLFetcher({
    url: GRAPH_QL_URL,
    subscriptionUrl: GRAPH_QL_SUBSCRIPTION_URL,
});


const getData = (params) => {
    return fetch(GRAPH_QL_URL, {
        method: 'POST',
        body: JSON.stringify(params),
    })
      .then((response) => response.text())
      .then((responseBody) => {
          try {
              return JSON.parse(responseBody)
          } catch (e) {
              return responseBody
          }
      })
}


class Console extends Component {
    _graphiql
    state = { schema: null, query: DEFAULT_QUERY, explorerIsOpen: true }

    componentDidMount() {
        this.getSchema();
    }

    getSchema = () => {
        getData({
            query: getIntrospectionQuery(),
        }).then((result) => {
            // const editor = this._graphiql.getQueryEditor()
            // if (editor) {
            //     editor.setOption("extraKeys", {
            //         ...(editor.options.extraKeys || {}),
            //         "Shift-Alt-LeftClick": this._handleInspectOperation,
            //     })
            // }

            this.setState({ schema: buildClientSchema(result.data) })
        });
    };

    // _handleInspectOperation = (cm, mousePos) => {
    //     const parsedQuery = parse(this.state.query || "")
    //
    //     if (!parsedQuery) {
    //         console.error("Couldn't parse query document")
    //         return null
    //     }
    //
    //     var token = cm.getTokenAt(mousePos)
    //     var start = { line: mousePos.line, ch: token.start }
    //     var end = { line: mousePos.line, ch: token.end }
    //     var relevantMousePos = {
    //         start: cm.indexFromPos(start),
    //         end: cm.indexFromPos(end),
    //     }
    //
    //     var position = relevantMousePos
    //
    //     var def = parsedQuery.definitions.find((definition) => {
    //         if (!definition.loc) {
    //             console.log("Missing location information for definition")
    //             return false
    //         }
    //
    //         const { start, end } = definition.loc
    //         return start <= position.start && end >= position.end
    //     })
    //
    //     if (!def) {
    //         console.error(
    //             "Unable to find definition corresponding to mouse position"
    //         )
    //         return null
    //     }
    //
    //     var operationKind =
    //         def.kind === "OperationDefinition"
    //             ? def.operation
    //             : def.kind === "FragmentDefinition"
    //             ? "fragment"
    //             : "unknown"
    //
    //     var operationName =
    //         def.kind === "OperationDefinition" && !!def.name
    //             ? def.name.value
    //             : def.kind === "FragmentDefinition" && !!def.name
    //             ? def.name.value
    //             : "unknown"
    //
    //     var selector = `.graphiql-explorer-root #${operationKind}-${operationName}`
    //
    //     var el = document.querySelector(selector)
    //     el && el.scrollIntoView()
    // }

    _handleEditQuery = (query) => this.setState({ query })

    _handleToggleExplorer = () => {
        this.setState({ explorerIsOpen: !this.state.explorerIsOpen })
    }

    render() {
        const { query, schema } = this.state
        return (
            <div className="graphiql-container">
                <GraphiQLExplorer
                    schema={schema}
                    query={query}
                    onEdit={this._handleEditQuery}
                    onRunOperation={(operationName) =>
                        this._graphiql.handleRunQuery(operationName)
                    }
                    explorerIsOpen={this.state.explorerIsOpen}
                    onToggleExplorer={this._handleToggleExplorer}
                    getDefaultScalarArgValue={getDefaultScalarArgValue}
                    makeDefaultArg={makeDefaultArg}
                />
                <GraphiQL
                    ref={(ref) => (this._graphiql = ref)}
                    fetcher={fetcher}
                    schema={schema}
                    query={query}
                    onEditQuery={this._handleEditQuery}
                >
                    <GraphiQL.Toolbar>
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handlePrettifyQuery()}
                            label="Prettify"
                            title="Prettify Query (Shift-Ctrl-P)"
                        />
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handleToggleHistory()}
                            label="History"
                            title="Show History"
                        />
                        <GraphiQL.Button
                            onClick={this._handleToggleExplorer}
                            label="Explorer"
                            title="Toggle Explorer"
                        />
                        <GraphiQL.Button
                            onClick={this.props.handleSqlEditorVisible}
                            label="SQL Editor"
                            title="Show Editor"
                        />
                    </GraphiQL.Toolbar>
                </GraphiQL>
            </div>
        )
    }
}

export default Console;
