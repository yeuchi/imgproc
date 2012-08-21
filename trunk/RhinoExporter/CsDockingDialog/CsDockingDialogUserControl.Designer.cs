namespace CsDockingDialog
{
  partial class CsDockingDialogUserControl
  {
    /// <summary> 
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary> 
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Component Designer generated code

    /// <summary> 
    /// Required method for Designer support - do not modify 
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
        System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CsDockingDialogUserControl));
        this.groupBox1 = new System.Windows.Forms.GroupBox();
        this.btnBrowse = new System.Windows.Forms.Button();
        this.txtFileSrc = new System.Windows.Forms.TextBox();
        this.groupBox2 = new System.Windows.Forms.GroupBox();
        this.label1 = new System.Windows.Forms.Label();
        this.txtTitle = new System.Windows.Forms.TextBox();
        this.txtDescription = new System.Windows.Forms.TextBox();
        this.label2 = new System.Windows.Forms.Label();
        this.txtToken = new System.Windows.Forms.TextBox();
        this.label3 = new System.Windows.Forms.Label();
        this.btnUpload = new System.Windows.Forms.Button();
        this.pictureBox1 = new System.Windows.Forms.PictureBox();
        this.groupBox1.SuspendLayout();
        this.groupBox2.SuspendLayout();
        ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
        this.SuspendLayout();
        // 
        // groupBox1
        // 
        this.groupBox1.Controls.Add(this.txtFileSrc);
        this.groupBox1.Controls.Add(this.btnBrowse);
        this.groupBox1.Location = new System.Drawing.Point(4, 4);
        this.groupBox1.Name = "groupBox1";
        this.groupBox1.Size = new System.Drawing.Size(454, 60);
        this.groupBox1.TabIndex = 0;
        this.groupBox1.TabStop = false;
        this.groupBox1.Text = "Load File";
        // 
        // btnBrowse
        // 
        this.btnBrowse.Location = new System.Drawing.Point(7, 20);
        this.btnBrowse.Name = "btnBrowse";
        this.btnBrowse.Size = new System.Drawing.Size(75, 23);
        this.btnBrowse.TabIndex = 0;
        this.btnBrowse.Text = "Browse";
        this.btnBrowse.UseVisualStyleBackColor = true;
        this.btnBrowse.Click += new System.EventHandler(this.btnBrowse_Click);
        // 
        // txtFileSrc
        // 
        this.txtFileSrc.Location = new System.Drawing.Point(89, 22);
        this.txtFileSrc.Name = "txtFileSrc";
        this.txtFileSrc.Size = new System.Drawing.Size(346, 20);
        this.txtFileSrc.TabIndex = 1;
        // 
        // groupBox2
        // 
        this.groupBox2.Controls.Add(this.btnUpload);
        this.groupBox2.Controls.Add(this.txtToken);
        this.groupBox2.Controls.Add(this.label3);
        this.groupBox2.Controls.Add(this.txtDescription);
        this.groupBox2.Controls.Add(this.label2);
        this.groupBox2.Controls.Add(this.txtTitle);
        this.groupBox2.Controls.Add(this.label1);
        this.groupBox2.Location = new System.Drawing.Point(4, 71);
        this.groupBox2.Name = "groupBox2";
        this.groupBox2.Size = new System.Drawing.Size(454, 159);
        this.groupBox2.TabIndex = 1;
        this.groupBox2.TabStop = false;
        this.groupBox2.Text = "Export";
        // 
        // label1
        // 
        this.label1.AutoSize = true;
        this.label1.Location = new System.Drawing.Point(7, 20);
        this.label1.Name = "label1";
        this.label1.Size = new System.Drawing.Size(30, 13);
        this.label1.TabIndex = 0;
        this.label1.Text = "Title:";
        // 
        // txtTitle
        // 
        this.txtTitle.Location = new System.Drawing.Point(89, 17);
        this.txtTitle.Name = "txtTitle";
        this.txtTitle.Size = new System.Drawing.Size(240, 20);
        this.txtTitle.TabIndex = 1;
        this.txtTitle.Text = "Your CAD Title";
        // 
        // txtDescription
        // 
        this.txtDescription.Location = new System.Drawing.Point(89, 43);
        this.txtDescription.Multiline = true;
        this.txtDescription.Name = "txtDescription";
        this.txtDescription.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
        this.txtDescription.Size = new System.Drawing.Size(240, 75);
        this.txtDescription.TabIndex = 3;
        this.txtDescription.Text = "My awesome Rhino model.";
        // 
        // label2
        // 
        this.label2.AutoSize = true;
        this.label2.Location = new System.Drawing.Point(7, 46);
        this.label2.Name = "label2";
        this.label2.Size = new System.Drawing.Size(63, 13);
        this.label2.TabIndex = 2;
        this.label2.Text = "Description:";
        // 
        // txtToken
        // 
        this.txtToken.Location = new System.Drawing.Point(89, 124);
        this.txtToken.Name = "txtToken";
        this.txtToken.Size = new System.Drawing.Size(240, 20);
        this.txtToken.TabIndex = 5;
        this.txtToken.Text = "bffe118cb6b946e2898772fca523ab91";
        // 
        // label3
        // 
        this.label3.AutoSize = true;
        this.label3.Location = new System.Drawing.Point(7, 127);
        this.label3.Name = "label3";
        this.label3.Size = new System.Drawing.Size(41, 13);
        this.label3.TabIndex = 4;
        this.label3.Text = "Token:";
        // 
        // btnUpload
        // 
        this.btnUpload.Location = new System.Drawing.Point(360, 20);
        this.btnUpload.Name = "btnUpload";
        this.btnUpload.Size = new System.Drawing.Size(75, 23);
        this.btnUpload.TabIndex = 6;
        this.btnUpload.Text = "Upload";
        this.btnUpload.UseVisualStyleBackColor = true;
        this.btnUpload.Click += new System.EventHandler(this.btnUpload_Click);
        // 
        // pictureBox1
        // 
        this.pictureBox1.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("pictureBox1.BackgroundImage")));
        this.pictureBox1.Location = new System.Drawing.Point(146, 236);
        this.pictureBox1.Name = "pictureBox1";
        this.pictureBox1.Size = new System.Drawing.Size(170, 40);
        this.pictureBox1.TabIndex = 2;
        this.pictureBox1.TabStop = false;
        // 
        // CsDockingDialogUserControl
        // 
        this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
        this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
        this.Controls.Add(this.pictureBox1);
        this.Controls.Add(this.groupBox2);
        this.Controls.Add(this.groupBox1);
        this.Name = "CsDockingDialogUserControl";
        this.Size = new System.Drawing.Size(476, 295);
        this.groupBox1.ResumeLayout(false);
        this.groupBox1.PerformLayout();
        this.groupBox2.ResumeLayout(false);
        this.groupBox2.PerformLayout();
        ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
        this.ResumeLayout(false);

    }

    #endregion

    private System.Windows.Forms.GroupBox groupBox1;
    private System.Windows.Forms.TextBox txtFileSrc;
    private System.Windows.Forms.Button btnBrowse;
    private System.Windows.Forms.GroupBox groupBox2;
    private System.Windows.Forms.TextBox txtToken;
    private System.Windows.Forms.Label label3;
    private System.Windows.Forms.TextBox txtDescription;
    private System.Windows.Forms.Label label2;
    private System.Windows.Forms.TextBox txtTitle;
    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.Button btnUpload;
    private System.Windows.Forms.PictureBox pictureBox1;
  }
}
