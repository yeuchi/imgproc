using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Text;
using System.Windows.Forms;

namespace CsDockingDialog
{
  public partial class CsDockingDialogUserControl : UserControl
  {
    public CsDockingDialogUserControl()
    {
      InitializeComponent();
    }

    private void btnBrowse_Click(object sender, EventArgs e)
    {

    }

    private void btnUpload_Click(object sender, EventArgs e)
    {
        
        byte[] bCADfile = new byte[100];

        Exporter exporter = new Exporter();
        exporter.export(Model.txtFilename,
                        Model.txtTitle,
                        this.txtDescription.Text,
                        this.txtToken.Text,
                        bCADfile);
    }
  }
}
