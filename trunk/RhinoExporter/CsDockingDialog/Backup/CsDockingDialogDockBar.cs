using System;
using System.Windows.Forms;
using RMA.Rhino;
using RMA.UI;

namespace CsDockingDialog
{
  class CsDockingDialogDockBar : MRhinoUiDockBar
  {
    public CsDockingDialogDockBar()
      : base()
    {
    }

    public CsDockingDialogDockBar(Guid id, string name, Control control)
      : base(id, name, control)
    {
    }

    static public Guid ID()
    {
      return new System.Guid("{7616647E-32AE-4CDC-BA61-F754F0D35AB8}");
    }
  }
}
