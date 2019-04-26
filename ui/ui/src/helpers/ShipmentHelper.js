import uuidv4 from 'uuid/v4'

export default {
    buildShipment: function (parcelFormViewModel, sourceAddress, destinationAddressFormViewModel) {
        let shipmentRef = uuidv4()

        let weightOz = (parseInt(parcelFormViewModel.formLbs) * 16) + parseInt(parcelFormViewModel.formOz)

        let parcel = {
            weightOz: weightOz,
            heightIn: parseInt(parcelFormViewModel.heightIn),
            lengthIn: parseInt(parcelFormViewModel.lengthIn),
            widthIn: parseInt(parcelFormViewModel.widthIn)
        }

        let shipment = {
            ref: shipmentRef,
            isLoading: true,
            sourceAddress: sourceAddress,
            destinationAddress: destinationAddressFormViewModel,
            parcel: parcel
        }

        return shipment
    }
}
