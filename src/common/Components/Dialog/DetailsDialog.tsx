import * as React from 'react';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { useBoolean } from '@uifabric/react-hooks';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import styles from './DetailsDialog.module.scss';

export interface DetailsDialogProps {
  children?: never[]
  item: any;
  open: boolean;
  onClose: () => void
}

export function DetailsDialog(props: DetailsDialogProps) {

  function formatValue(val: string) {
    return (val ? val : "-");
  }

  const { open, onClose, item } = props;

  const dialogStyles = { main: { maxWidth: 800 } };

  const dialogDetails = [
    { label: "Reason For Travel", value: formatValue(item.ReasonForTravel) },
    { label: "Destination", value: formatValue(item.Destination.DisplayName) },
    { label: "Travel Star tDate", value: formatValue(item.TravelStartDate) },
    { label: "Travel End Date", value: formatValue(item.TravelEndDate) },
    { label: "Airline", value: formatValue(item.Airline) },
    { label: "Estimated Airfare", value: formatValue(item.EstimatedAirfare) },
    { label: "Hotel", value: formatValue(item.Hotel.DisplayName) },
    { label: "Approved", value: formatValue(item.Approved) },
    { label: "Requester", value: formatValue(item.Requester.Title) }
  ]

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Details',
  };

  const handleClose = () => () => {
    onClose();
  };

  const modalProps = {
    isBlocking: true,
  }

  return (
    <Dialog
      hidden={!open}
      onDismiss={handleClose()}
      dialogContentProps={dialogContentProps}
      styles={dialogStyles}
      modalProps={modalProps}>

      <div className={styles.detailsGrid}>
        {
          dialogDetails.map(d =>
            <>
              <div>
                <strong>{d.label}</strong>
              </div>
              <div>{d.value}</div>
            </>)
        }
      </div>
      <DialogFooter>
        <DefaultButton onClick={handleClose()} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
}
