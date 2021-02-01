import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";


export class SPService {

    public constructor(spcontext: WebPartContext) {
        sp.setup({
            spfxContext: spcontext
        });
    }

    public getDialogListItems(litsName: string) {
        let items = sp.web.lists.getByTitle(litsName)
            .items
            .select("Title,ReasonForTravel,Destination,TravelStartDate,TravelEndDate,Airline,EstimatedAirfare,Hotel,EstimatedHotelCost,Approved,Requester/Title")
            .expand("Requester")
            .get();
        return items;
    }
}