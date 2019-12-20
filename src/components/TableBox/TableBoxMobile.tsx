import React from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import { Table } from "antd";
import { Card } from "antd-mobile";
import "../../pages/PokemonListPage/PokemonListPage.css";
import { Tag } from "../../components/Tag/Tag";
import "./TableBoxMobile.css";

const { Column } = Table;

export const TableBoxMobile = observer(() => {
  const { pokemonList } = pokemonStore;

  return (
    <div>
      {pokemonList.map(({ id, name, avatar, types, stats }) => (
        <div key={id} className="card-box">
          <Card>
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
                <div className="card-box__tag">
                  {types.map((type) => (
                    <Tag key={type}>{type}</Tag>
                  ))}
                </div>
              }
            />
          </Card>
        </div>
      ))}
    </div>
  );
});
