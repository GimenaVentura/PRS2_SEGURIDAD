import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from "sweetalert2";// Fixed import path
import { FormHomeComponent } from "./form-home/form-home.component";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { HomeService } from "../../../../services/home.service";
import { Home } from "../../../../interfaces/home";
import { AuthService } from "../../../../auth/services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homes: Home[] = [];
  filteredHomes: Home[] = [];
  showingActive: boolean = true;
  searchTerm: string = '';
  homeToEdit: Home | null = null;
  
  // Dialog control
  showDialog: boolean = false;

  // Variables para el control de permisos
  userRole: string | null = null
  isAdmin = false
  isUser = false
  
  // Export dropdown control
  showExportDropdown: boolean = false;

  displayedColumns: string[] = [
    "id_home",
    "names",
    "address",
    "status",
    "actions"
  ];

  constructor(private homeService: HomeService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadHomes();
    this.checkUserPermissions()
  }

   /**
   * 🔒 Verificar permisos del usuario
   */
  private checkUserPermissions(): void {
    this.userRole = this.authService.getRole()
    this.isAdmin = this.authService.isAdminSync()
    this.isUser = this.authService.isUserSync()

    console.log("Rol del usuario:", this.userRole)
    console.log("Es admin:", this.isAdmin)
    console.log("Es user:", this.isUser)
  }

  /**
   * 🚫 Verificar si el usuario puede realizar operaciones de escritura
   */
  private canPerformWriteOperation(): boolean {
    return this.authService.canWrite()
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.export-dropdown-container')) {
      this.closeExportDropdown();
    }
  }

  toggleExportDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.showExportDropdown = !this.showExportDropdown;
  }

  closeExportDropdown(): void {
    this.showExportDropdown = false;
  }

  loadHomes(): void {
    const service = this.showingActive
      ? this.homeService.getActiveHomes()
      : this.homeService.getInactiveHomes();

    service.subscribe({
      next: (data: Home[]) => {
        this.homes = data;
        this.filteredHomes = [...data];
      },
      error: (err) => {
        console.error("Error loading homes:", err);
        Swal.fire("Error", "Could not load homes", "error");
      }
    });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredHomes = [...this.homes];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredHomes = this.homes.filter(h => 
        h.names.toLowerCase().includes(term) || 
        h.address.toLowerCase().includes(term) ||
        h.id_home.toString().includes(term)
      );
    }
  }

  downloadPDF(): void {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm' });
    doc.setFontSize(20);
    doc.setTextColor(33, 82, 177);
    doc.setFont('helvetica', 'bold');
    doc.text('HOMES REPORT', 105, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 25);
    doc.text(`Filter: ${this.showingActive ? 'Active' : 'Inactive'}`, 14, 30);
    doc.text(`Total records: ${this.filteredHomes.length}`, 190, 25, { align: 'right' });

    autoTable(doc, {
      head: [['ID', 'Name', 'Address', 'Status']],
      body: this.filteredHomes.map(h => [
        h.id_home.toString(),
        h.names,
        h.address,
        h.status === 'A' ? 'Active' : 'Inactive'
      ]),
      startY: 35,
      margin: { left: 10, right: 10 },
      headStyles: {
        fillColor: [33, 82, 177],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 45 },
        2: { cellWidth: 80 },
        3: { cellWidth: 20 }
      },
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `Page ${data.pageNumber}`,
          data.settings.margin.right,
          doc.internal.pageSize.getHeight() - 5,
          { align: 'right' }
        );
      }
    });

    doc.save(`Homes_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  downloadExcel(): void {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Homes');

  const headerStyle = {
  font: { bold: true, color: { argb: 'FFFFFFFF' } },
  fill: { type: 'pattern' as const, pattern: 'solid' as const, fgColor: { argb: 'FF2152B1' } },
  alignment: { horizontal: 'center' as const, vertical: 'middle' as const },
  border: {
    top: { style: 'thin' as const },
    left: { style: 'thin' as const },
    bottom: { style: 'thin' as const },
    right: { style: 'thin' as const }
  }
};

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Address', key: 'address', width: 50 },
    { header: 'Status', key: 'status', width: 12 }
  ];

  worksheet.getRow(1).eachCell((cell) => {
    cell.style = headerStyle;
  });

  this.filteredHomes.forEach(home => {
    worksheet.addRow({
      id: home.id_home,
      name: home.names,
      address: home.address,
      status: home.status === 'A' ? 'Active' : 'Inactive'
    });
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const fillColor = rowNumber % 2 === 0 ? 'FFF0F0F0' : 'FFFFFFFF'; // 8 caracteres

      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' as const },
          left: { style: 'thin' as const },
          bottom: { style: 'thin' as const },
          right: { style: 'thin' as const }
        };

        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: fillColor }
        };
      });
    }
  });

  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Homes_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  });
}

  downloadCSV(): void {
    let csv = 'ID;Name;Address;Status\n';
    
    this.filteredHomes.forEach(h => {
      csv += `${h.id_home};`;
      csv += `${h.names.replace(/;/g, ',')};`;
      csv += `${h.address.replace(/;/g, ',')};`;
      csv += `${h.status === 'A' ? 'Active' : 'Inactive'}\n`;
    });
    
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Homes_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  toggleHomes(): void {
    this.showingActive = !this.showingActive;
    this.loadHomes();
  }

  editHome(home: Home): void {
    this.homeToEdit = home;
    this.showDialog = true;
  }

  handleDialogResult(result: boolean): void {
    this.showDialog = false;
    if (result) {
      this.loadHomes();
      Swal.fire(
        'Success', 
        this.homeToEdit ? 'Home has been updated' : 'Home has been registered', 
        'success'
      );
    }
    this.homeToEdit = null;
  }

  

  openFormHome(): void {
    this.homeToEdit = null;
    this.showDialog = true;
  }

toggleHomeState(id: number, names: string, status: string): void {
  const isActive = status === "A";

  Swal.fire({
    title: `${isActive ? 'Deactivate' : 'Activate'} home?`,
    text: `Are you sure you want to ${isActive ? 'deactivate' : 'activate'} "${names}"?`,
    icon: isActive ? 'warning' : 'info',
    showCancelButton: true,
    confirmButtonColor: isActive ? '#d33' : '#28a745',
    cancelButtonColor: '#6c757d',
    confirmButtonText: `Yes, ${isActive ? 'deactivate' : 'activate'}`,
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      let obs: import('rxjs').Observable<any>;
      if (isActive) {
        obs = this.homeService.deactivateHome(id);
      } else {
        obs = this.homeService.reactivateHome(id);
      }

      obs.subscribe({
        next: () => {
          Swal.fire(
            'Success',
            `The home has been ${isActive ? 'deactivated' : 'activated'} successfully`,
            'success'
          );
          this.loadHomes();
        },
        error: (err) => {
          console.error(`Error ${isActive ? 'deactivating' : 'activating'} home:`, err);
          Swal.fire(
            'Error',
            `Could not ${isActive ? 'deactivate' : 'activate'} the home`,
            'error'
          );
        }
      });
    }
  });
} 
  closeDialog(): void {
    this.showDialog = false;
    this.homeToEdit = null;
  }
}

  
