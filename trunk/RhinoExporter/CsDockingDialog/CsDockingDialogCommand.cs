// ==================================================================
//
// adding functionality on top of McNeel's demo
// http://wiki.mcneel.com/developer/dotnetplugins
//
// ==================================================================
using RMA.Rhino;
using RMA.OpenNURBS;
using System.Collections.Generic;

namespace CsDockingDialog
{
  ///<summary>
  /// A Rhino.NET plug-in can contain as many MRhinoCommand derived classes as it wants.
  /// DO NOT create an instance of this class (this is the responsibility of Rhino.NET.)
  /// A command wizard can be found in visual studio when adding a new item to the project.
  /// </summary>
  public class CsDockingDialogCommand : RMA.Rhino.MRhinoCommand
  {
    ///<summary>
    /// Rhino tracks commands by their unique ID. Every command must have a unique id.
    /// The Guid created by the project wizard is unique. You can create more Guids using
    /// the "Create Guid" tool in the Tools menu.
    ///</summary>
    ///<returns>The id for this command</returns>
    public override System.Guid CommandUUID()
    {
      return new System.Guid("{ca35e822-6ca9-4a74-940b-ea281ea0f6f7}");
    }

    ///<returns>The command name as it appears on the Rhino command line</returns>
    public override string EnglishCommandName()
    {
      return "CsDockingDialogCommand";
    }

    private string getSketchFabPath()
    {
        string path = System.Reflection.Assembly.GetExecutingAssembly().Location;
        return path;
    }

    ///<summary> This gets called when when the user runs this command.</summary>
    public override IRhinoCommand.result RunCommand(IRhinoCommandContext context)
    {
        
        
        Model.globalContext = context;

        // get file info after it has been loaded into memory.
        Model.txtFilename = context.m_doc.GetPathName();
        Model.txtTitle = context.m_doc.GetTitle();
        //  http://wiki.mcneel.com/developer/sdksamples/meshvolume
        MRhinoGetObject go = new MRhinoGetObject();
  go.SetCommandPrompt( "Select solid meshes for volume calculation" );
  go.SetGeometryFilter( IRhinoGetObject.GEOMETRY_TYPE_FILTER.mesh_object );
  go.SetGeometryAttributeFilter( IRhinoGetObject.GEOMETRY_ATTRIBUTE_FILTER.closed_mesh );
  go.EnableSubObjectSelect(false);
  go.EnableGroupSelect();
  go.GetObjects( 1, 0 );
  if( go.CommandResult() != IRhinoCommand.result.success )
    return go.CommandResult();

  List<IOnMesh> meshes = new List<IOnMesh>();
  for( int i = 0; i < go.ObjectCount(); i++ )
  {
    IOnMesh mesh = go.Object(i).Mesh();
    if( mesh != null )
      meshes.Add( mesh );
  }
  if( meshes.Count == 0 )
    return IRhinoCommand.result.nothing;
 
  OnBoundingBox bbox = new OnBoundingBox();
  for( int i = 0; i < meshes.Count; i++ )
    meshes[i].GetBoundingBox( ref bbox, 1 );
  On3dPoint base_point = bbox.Center();
 
  double total_volume = 0.0;
  double total_error_estimate = 0.0;
  string msg;
  for( int i = 0; i < meshes.Count; i++ )
  {
    double error_estimate = 0.0;
    double volume = meshes[i].Volume( base_point, ref error_estimate );
    msg = string.Format("Mesh {0} = {1:f} (+/- {2:f}\n",i,volume,error_estimate);
    RhUtil.RhinoApp().Print( msg );
    total_volume += volume;
    total_error_estimate += error_estimate;
  }
  msg = string.Format("Total volume = {0:f} (+/- {1:f})\n",
                      total_volume,
                      total_error_estimate);
  RhUtil.RhinoApp().Print( msg );
  return IRhinoCommand.result.success;
        
        /*
        System.Guid id = CsDockingDialogDockBar.ID();
      bool bVisible = RMA.UI.MRhinoDockBarManager.IsDockBarVisible(id);
        
      string prompt;
      if (bVisible)
        prompt = string.Format("{0} window is visible. New value", EnglishCommandName());
      else
        prompt = string.Format("{0} window is hidden. New value", EnglishCommandName());

      MRhinoGetOption go = new MRhinoGetOption();
      go.SetCommandPrompt(prompt);
      int h_option = go.AddCommandOption(new MRhinoCommandOptionName("Hide"));
      int s_option = go.AddCommandOption(new MRhinoCommandOptionName("Show"));
      int t_option = go.AddCommandOption(new MRhinoCommandOptionName("Toggle"));
      go.GetOption();
      if (go.CommandResult() != IRhinoCommand.result.success)
        return go.CommandResult();

      IRhinoCommandOption opt = go.Option();
      if (opt == null)
        return IRhinoCommand.result.failure;

      int option_index = opt.m_option_index;
      if (h_option == option_index)
      {
        if (bVisible)
          RMA.UI.MRhinoDockBarManager.ShowDockBar(id, false, false);
      }
      else if (s_option == option_index)
      {
        if (!bVisible)
          RMA.UI.MRhinoDockBarManager.ShowDockBar(id, true, false);
      }
      else if (t_option == option_index)
      {
        if (bVisible)
          RMA.UI.MRhinoDockBarManager.ShowDockBar(id, false, false);
        else
          RMA.UI.MRhinoDockBarManager.ShowDockBar(id, true, false);
      }
        
      return IRhinoCommand.result.success;*/
    }
  }
}

