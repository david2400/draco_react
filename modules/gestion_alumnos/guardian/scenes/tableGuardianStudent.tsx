import React from 'react';
import {ITable} from '@repo/ui/table/models';
import {DataTable} from '@repo/ui/table/scenes';
import {Card} from '@repo/ui/card/scenes/card';

export const TableGuardianStudent = ({headerTable, data, columns}: ITable<any>) => {
  return (
    <Card>
      <DataTable data={data} columns={columns} headerTable={headerTable} className='py-2' />
    </Card>
  );
};
