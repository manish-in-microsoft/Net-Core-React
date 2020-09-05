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

namespace Org.Example.Membership.Domain
{
  /// <summary>
  /// A member.
  /// </summary>
  public sealed class Member : Entity
  {
    /// <summary>
    /// Gets or sets the member's date of birth.
    /// </summary>
    public DateTime BirthDate { get; set; }

    /// <summary>
    /// Gets or sets the city in which the member normally resides.
    /// </summary>
    public string City { get; set; }

    /// <summary>
    /// Gets or sets an email address for the member.
    /// </summary>
    public string EmailAddress { get; set; }

    /// <summary>
    /// Gets or sets the full member name.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Gets or sets a phone number for the member.
    /// </summary>
    public string PhoneNumber { get; set; }
  }
}