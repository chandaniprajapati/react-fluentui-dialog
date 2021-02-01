import * as React from 'react';
import styles from './SpfxUifabricDialog.module.scss';
import { ISpfxUifabricDialogProps } from './ISpfxUifabricDialogProps';
import { ISpfxUifabricDialogState } from './ISpfxUifabricDialogState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPService } from '../../../common/Services/SPService';
import { DetailsDialog } from '../../../common/Components/Dialog/DetailsDialog';
import { Label } from 'office-ui-fabric-react';

export default class SpfxUifabricDialog extends React.Component<ISpfxUifabricDialogProps, ISpfxUifabricDialogState> {

  private _spService: SPService;

  constructor(props: ISpfxUifabricDialogProps) {
    super(props);
    this.state = {
      dialogItems: [],
      openDialog: false,
      selectedItem: {}
    }
    this._spService = new SPService(this.props.context);
  }

  public openDialog(item) {
    return function () {
      this.setState({ selectedItem: item, openDialog: true });
    }
  }

  public closeDialog() {
    this.setState({ openDialog: false })
  }

  public async getDialogItems() {
    let { listName } = this.props;
    if (listName) {
      let items = await this._spService.getDialogListItems(listName);
      this.setState({ dialogItems: items });
    }
  }

  public componentDidMount() {
    this.getDialogItems();
  }

  public componentDidUpdate(prevProps: ISpfxUifabricDialogProps) {
    if (prevProps.listName !== this.props.listName) {
      this.getDialogItems();
    }
  }

  public render(): React.ReactElement<ISpfxUifabricDialogProps> {
    return (
      <div>
        {
          this.state.dialogItems.length ?
            <div className={styles.spfxUifabricDialog}>
              <div>
                <strong>{this.props.description ? this.props.description : ''}</strong>
              </div>
              <table className={styles.detailsTable}>
                <thead>
                  <th>Title</th>
                  <th>Travel Start Date</th>
                  <th>Travel End Date</th>
                  <th>Reason For Travel</th>
                  <th>Details</th>
                </thead>
                <tbody>
                  {
                    this.state.dialogItems.map(i => (
                      <tr>
                        <td>{i.Title}</td>
                        <td>{i.TravelStartDate}</td>
                        <td>{i.TravelEndDate}</td>
                        <td>{i.ReasonForTravel}</td>
                        <td><a href="#" onClick={this.openDialog(i).bind(this)}>More Details</a> </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {
                this.state.openDialog ?
                  <DetailsDialog
                    open={this.state.openDialog}
                    item={this.state.selectedItem}
                    onClose={this.closeDialog.bind(this)}
                  >
                  </DetailsDialog>
                  : <></>
              }
            </div>
            : <></>
        }
      </div>
    );
  }
}
