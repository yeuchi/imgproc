///<summary>
/// The following class is required for all Rhino.NET plug-ins.
/// These are used to display plug-in information in the plug-in manager.
/// Any string will work for these attributes, so if you don't have a fax
/// number it is OK to enter something like "none"
///</summary>
namespace CsDockingDialog
{
  public class CsDockingDialogPlugInAttributes : RMA.Rhino.MRhinoPlugInAttributes
  {
    public override string Address()
    {
      return "5040 Washburn Avenue South\nMinneapolis, MN 55410";
    }
    public override string Country()
    {
      return "USA";
    }
    public override string Email()
    {
      return "yeuchi@gmail.com";
    }
    public override string Fax()
    {
      return "";
    }
    public override string Organization()
    {
      return "C.T. Yeung";
    }
    public override string Phone()
    {
      return "612.247.7329";
    }
    public override string UpdateURL()
    {
      return "http://www.ctyeung.com";
    }
    public override string Website()
    {
      return "http://www.ctyeung.com";
    }
  }
}
