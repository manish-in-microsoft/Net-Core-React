///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of
/// this software and associated documentation files (the "Software"), to deal in the
/// Software without restriction, including without limitation the rights to use, copy,
/// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
/// and to permit persons to whom the Software is furnished to do so, subject to the
/// following conditions:
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
/// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
/// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
/// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
/// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
/// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///

using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace Org.Example.Membership.Domain
{
  /// <summary>
  /// A domain entity.
  /// </summary>
  public abstract class Entity
  {
    /// <summary>
    /// Gets or the unique identifier for this entity instance.
    /// </summary>
    [Key]
    public Guid ID { get; set; }

    /// <summary>
    /// Gets whether this is a new, unsaved entity instance. This is determined
    /// by checking whether the entity identifier is uninitialized.
    /// </summary>
    [JsonIgnore]
    [XmlIgnore]
    public bool IsNew
    {
      get
      {
        return ID == Guid.Empty;
      }
    }
  }
}