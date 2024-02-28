import FileSaver from 'file-saver'
import { Injectable } from '@angular/core'
// Custom
import { ManifestExportCrewVM } from '../view-models/export/manifest-export-crew-vm'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { ManifestPassengerVM } from '../view-models/list/manifest-passenger-vm'

@Injectable({ providedIn: 'root' })

export class ManifestExportCrewService {

    private exportCrew: ManifestExportCrewVM[]

    constructor(private dateHelperService: DateHelperService) { }

    public buildCrew(passengers: ManifestPassengerVM[]): ManifestExportCrewVM[] {
        let row = 0
        this.exportCrew = []
        passengers.filter(x => x.occupant.id == 1).forEach(record => {
            this.exportCrew.push({
                Crew_Number: ++row,
                Crew_Family_name: record.lastname,
                Crew_Given_name: record.firstname,
                Crew_Gender: record.gender.description,
                Crew_Duty_of_crew: 'Master',
                Crew_Nationality: record.nationality.code,
                Crew_Date_of_birth: this.dateHelperService.formatISODateToLocale(record.birthdate),
                Crew_Place_of_birth: '',
                Crew_Country_of_birth: null,
                Crew_Nature_of_identity_document: 'Other',
                Crew_Number_of_identity_document: '0',
                Crew_Issuing_State_of_Identity_Document: '',
                Crew_Expiry_Date_of_Identity_Document: '',
                Crew_Visa_Residence_Permit_number: ''
            })
        })
        return this.exportCrew
    }

    public exportToExcel(exportCrew: ManifestExportCrewVM[]): void {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(exportCrew)
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
            this.saveAsExcelFile(excelBuffer, 'Crew')
        })
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const EXCEL_EXTENSION = '.xlsx'
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        })
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION)
    }

}
