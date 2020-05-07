import * as React from 'react';
import styles from './PermissionMatrix.module.scss';
import { IPermissionMatrixWebPartProps } from '../PermissionMatrixWebPart';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPSite } from '@microsoft/sp-page-context';
import DropPermissionItem from './DropPermission';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IDetailsListNavigatingFocusExampleState {
  items: string[];
  initialFocusedIndex?: number;
  groupSiteID?: string;
  parentFile: string;
  key: number;
}

export default class PermissionMatrix extends React.Component<IPermissionMatrixWebPartProps, {}> {
  public state: IDetailsListNavigatingFocusExampleState = {
    items: generateItems(''),
    parentFile: "root",
    key: 0,
  };

  private _dynamicColumn: IColumn[] = [

  ];

  private _columns: IColumn[] = [
    {
      key: 'filepath',
      name: 'File path',
      onRender: item => (
        // tslint:disable-next-line:jsx-no-lxambda
        <Link key={item} onClick={() => this._navigate(item)}>
          {item}
        </Link>
      ),
    } as IColumn,
    {
      key: 'size',
      name: 'Size',
      onRender: item => '4 KB',
    } as IColumn,
    {
      key: 'permissionset',
      name: 'Permission',
      onRender: item => (
        <DropPermissionItem/>
      )
    } as IColumn,
    this._dynamicColumn()
  ];

  public render(): JSX.Element {
    // By default, when the list is re-rendered on navigation or some other event,
    // focus goes to the list container and the user has to tab back into the list body.
    // Setting initialFocusedIndex makes focus go directly to a particular item instead.
    return (
      <DetailsList
        key={this.state.key}
        items={this.state.items}
        columns={this._columns}
        onItemInvoked={this._navigate}
        initialFocusedIndex={this.state.initialFocusedIndex}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="Row checkbox"
      />
    );
  }

  private _navigate = (name: string) => {
    this.setState({
      items: generateItems(name + ' / '),
      initialFocusedIndex: 0,
      key: this.state.key + 1,
    });
  }
}

function _DynamicColumns(): IColumn[] {
  if (this.IPermissionMatrixWebPartProps.people = null){
    return     {
      key: 'permissionset',
      name: 'Permission',
      minWidth: .1,
      onRender: item => (
        <DropPermissionItem/>
      )
    } as IColumn,
  } else {
    return this.IPermissionMatrixWebPartProps.people.forEach(element => [
      {
        key: element.id,
        name: element.name,
        minWidth: .1,
        onRender: item => (
          <DropPermissionItem/>
        )
      } as IColumn,
    ])
  }
  };

function generateItems(parent: string): string[] {
  return Array.prototype.map.call('ABCDEFGHI', (name: string) => parent + 'Folder ' + name);
}

function getLibraryItems(parent:string): any {
  this.context.msGraphClientFactory
  .getClient()
  .then((client: MSGraphClient): void => {
    client
      .api('/groups/'+this.SPSite.group+'/drive/items/'+parent+'/children')
      .get((error, response: any, rawResponse?: any) => {
        // handle the response
        if(error){
          return generateItems('');
        } else if (response){
          return response;
        }
    });
  });
}
