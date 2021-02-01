import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxUifabricDialogWebPartStrings';
import SpfxUifabricDialog from './components/SpfxUifabricDialog';
import { ISpfxUifabricDialogProps } from './components/ISpfxUifabricDialogProps';

export interface ISpfxUifabricDialogWebPartProps {
  listName: string;
  description: string;
}

export default class SpfxUifabricDialogWebPart extends BaseClientSideWebPart<ISpfxUifabricDialogWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxUifabricDialogProps> = React.createElement(
      SpfxUifabricDialog,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
