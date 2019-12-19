import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import { Table } from "antd";
import { Card, Tag } from "antd-mobile";
import "../../pages/PokemonListPage/PokemonListPage.css";

const { Column } = Table;

export const TableBoxMobile = observer(() => {
  const { init, pokemonList, amount } = pokemonStore;

  useEffect(() => {
    init(amount);
  }, []);

  return (
    <div className={"table-box"}>
      {pokemonList.map(({ id, name, avatar, types, stats }) => (
        <Card key={id}>
          <Card.Header title={name} thumb={avatar} extra={id} />
          <Card.Body>
            <div>
              <Table
                dataSource={stats}
                pagination={false}
                bordered
                size="small"
                tableLayout="auto"
                rowKey={(pokemonList, index): string => `${index}`}
              >
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Effort" dataIndex="effort" key="effort" />
                <Column title="Base stat" dataIndex="base_stat" key="base_stat" />
              </Table>
            </div>
          </Card.Body>
          <Card.Footer
            content="types"
            extra={
              <div>
                {types.map((type) => (
                  <Tag selected={true} key={type}>
                    {type}
                  </Tag>
                ))}
              </div>
            }
          />
        </Card>
      ))}
    </div>
  );
});
