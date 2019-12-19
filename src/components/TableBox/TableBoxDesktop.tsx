import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import { Table } from "antd";
import { Tag } from "../../components/Tag/Tag";

const { Column } = Table;

export const TableBoxDesktop = observer(() => {
  const { init, pokemonList, amount } = pokemonStore;

  useEffect(() => {
    init(amount);
  }, []);

  return (
    <div>
      <Table
        dataSource={pokemonList}
        rowKey={(pokemonList, index): string => `${index}`}
        pagination={false}
        size="small"
      >
        <Column title="ID" dataIndex="id" align="left" />
        <Column
          title="Avatar"
          dataIndex="avatar"
          key="avatar"
          align="center"
          render={(avatar): JSX.Element => {
            return <img src={avatar}></img>;
          }}
        />
        <Column title="Name" dataIndex="name" key="name" align="center" />
        <Column
          title="Types"
          dataIndex="types"
          key="types"
          align="center"
          render={(types): JSX.Element => {
            return (
              <div>
                {types.map((type) => (
                  <Tag key={type}>{type}</Tag>
                ))}
              </div>
            );
          }}
        />
        <Column
          title="Stats"
          dataIndex="stats"
          key="stats"
          align="center"
          width="325px"
          render={(stats): JSX.Element => (
            <Table
              dataSource={stats}
              pagination={false}
              className={"pokemon-list"}
              bordered
              size="small"
              tableLayout="auto"
              rowKey={(pokemonList, index): string => `${index}`}
            >
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Effort" dataIndex="effort" key="effort" />
              <Column title="Base stat" dataIndex="base_stat" key="base_stat" />
            </Table>
          )}
        />
      </Table>
    </div>
  );
});
