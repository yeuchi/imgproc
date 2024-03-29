namespace CsDockingDialog
{

  ///<summary>
  /// Every Rhino.NET Plug-In must have one and only one MRhinoPlugIn derived
  /// class. DO NOT create an instance of this class. It is the responsibility
  /// of Rhino.NET to create an instance of this class and register it with Rhino.
  ///</summary>
  public class CsDockingDialogPlugIn : RMA.Rhino.MRhinoUtilityPlugIn
  {
    private RMA.UI.MRhinoUiDockBar m_dockbar;
    private CsDockingDialogUserControl m_control;

    ///<summary>
    /// Rhino tracks plug-ins by their unique ID. Every plug-in must have a unique id.
    /// The Guid created by the project wizard is unique. You can create more Guids using
    /// the "Create Guid" tool in the Tools menu.
    /// </summary>
    /// <returns>The id for this plug-in</returns>
    public override System.Guid PlugInID()
    {
      return new System.Guid("{7dbc24dc-d7c6-4798-8288-94d783fae304}");
    }

    /// <returns>Plug-In name as displayed in the plug-in manager dialog</returns>
    public override string PlugInName()
    {
      return "CsDockingDialog";
    }

    ///<returns>Version information for this plug-in</returns>
    public override string PlugInVersion()
    {
      return "1.0.0.0";
    }

    ///<summary>
    /// Called after the plug-in is loaded and the constructor has been run.
    /// This is a good place to perform any significant initialization,
    /// license checking, and so on.  This function must return 1 for
    /// the plug-in to continue to load.
    ///</summary>
    ///<returns>
    ///  1 = initialization succeeded, let the plug-in load
    ///  0 = unable to initialize, don't load plug-in and display an error dialog
    /// -1 = unable to initialize, don't load plug-in and do not display an error
    ///      dialog. Note: OnUnloadPlugIn will not be called
    ///</returns>
    public override int OnLoadPlugIn()
    {
      m_control = new CsDockingDialogUserControl();
      m_dockbar = new RMA.UI.MRhinoUiDockBar(CsDockingDialogDockBar.ID(), PlugInName(), m_control);
      RMA.UI.MRhinoDockBarManager.CreateRhinoDockBar(this, m_dockbar, false);
      return 1;
    }

    ///<summary>
    /// Called when the plug-in is about to be unloaded.  After this
    /// function is called, the plug-in will be disposed.
    ///</summary>
    public override void OnUnloadPlugIn()
    {
      // TODO: Add plug-in cleanup code here.
    }


  }
}
